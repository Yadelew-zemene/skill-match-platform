DROP PROCEDURE IF EXISTS reconcile_resume_metadata_and_match_scores;

DELIMITER //

CREATE PROCEDURE reconcile_resume_metadata_and_match_scores()
BEGIN
    DECLARE has_original_filename INT DEFAULT 0;
    DECLARE has_mime_type INT DEFAULT 0;
    DECLARE has_file_size INT DEFAULT 0;
    DECLARE has_status INT DEFAULT 0;
    DECLARE has_is_active INT DEFAULT 0;
    DECLARE has_processing_error INT DEFAULT 0;
    DECLARE has_unique_resume_job INT DEFAULT 0;
    DECLARE duplicate_pair_count INT DEFAULT 0;
    DECLARE invalid_filename_count INT DEFAULT 0;

    /*
      ------------------------------------------------------------
      original_filename
      ------------------------------------------------------------
    */

    SELECT COUNT(*)
    INTO has_original_filename
    FROM information_schema.columns
    WHERE table_schema = DATABASE()
      AND table_name = 'resumes'
      AND column_name = 'original_filename';

    IF has_original_filename = 0 THEN
        ALTER TABLE resumes
            ADD COLUMN original_filename VARCHAR(255) NULL
            AFTER file_path;
    END IF;

    /*
      Derive filename only from an existing non-empty file_path.
      Windows '\' is normalized to '/' first.
    */
    UPDATE resumes
    SET original_filename =
        SUBSTRING_INDEX(
            REPLACE(file_path, CHAR(92), '/'),
            '/',
            -1
        )
    WHERE (original_filename IS NULL OR original_filename = '')
      AND file_path IS NOT NULL
      AND file_path <> '';

    /*
      Do not invent filenames.
      Stop if any existing row still has no usable filename.
    */
    SELECT COUNT(*)
    INTO invalid_filename_count
    FROM resumes
    WHERE original_filename IS NULL
       OR original_filename = '';

    IF invalid_filename_count > 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT =
                'Cannot make resumes.original_filename NOT NULL: existing rows have no usable filename';
    END IF;

    ALTER TABLE resumes
        MODIFY COLUMN original_filename VARCHAR(255) NOT NULL;


    /*
      ------------------------------------------------------------
      mime_type
      ------------------------------------------------------------
    */

    SELECT COUNT(*)
    INTO has_mime_type
    FROM information_schema.columns
    WHERE table_schema = DATABASE()
      AND table_name = 'resumes'
      AND column_name = 'mime_type';

    IF has_mime_type = 0 THEN
        ALTER TABLE resumes
            ADD COLUMN mime_type VARCHAR(100) NULL
            AFTER original_filename;
    END IF;


    /*
      ------------------------------------------------------------
      file_size
      ------------------------------------------------------------
    */

    SELECT COUNT(*)
    INTO has_file_size
    FROM information_schema.columns
    WHERE table_schema = DATABASE()
      AND table_name = 'resumes'
      AND column_name = 'file_size';

    IF has_file_size = 0 THEN
        ALTER TABLE resumes
            ADD COLUMN file_size INT NULL
            AFTER mime_type;
    END IF;


    /*
      ------------------------------------------------------------
      status
      ------------------------------------------------------------

      Historical processing state did not exist in the old schema.

      Therefore:
        - extracted_text present -> completed
        - otherwise -> NULL (unknown legacy state)

      We do NOT fabricate processing/failed for historical rows.
    */

    SELECT COUNT(*)
    INTO has_status
    FROM information_schema.columns
    WHERE table_schema = DATABASE()
      AND table_name = 'resumes'
      AND column_name = 'status';

    IF has_status = 0 THEN
        ALTER TABLE resumes
            ADD COLUMN status
                ENUM('processing', 'completed', 'failed')
                NULL
                AFTER extracted_text;

        UPDATE resumes
        SET status = 'completed'
        WHERE extracted_text IS NOT NULL
          AND TRIM(extracted_text) <> '';
    END IF;


    /*
      ------------------------------------------------------------
      is_active
      ------------------------------------------------------------
    */

    SELECT COUNT(*)
    INTO has_is_active
    FROM information_schema.columns
    WHERE table_schema = DATABASE()
      AND table_name = 'resumes'
      AND column_name = 'is_active';

    IF has_is_active = 0 THEN
        ALTER TABLE resumes
            ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT FALSE
            AFTER status;
    END IF;


    /*
      ------------------------------------------------------------
      processing_error
      ------------------------------------------------------------
    */

    SELECT COUNT(*)
    INTO has_processing_error
    FROM information_schema.columns
    WHERE table_schema = DATABASE()
      AND table_name = 'resumes'
      AND column_name = 'processing_error';

    IF has_processing_error = 0 THEN
        ALTER TABLE resumes
            ADD COLUMN processing_error TEXT NULL
            AFTER is_active;
    END IF;


    /*
      ------------------------------------------------------------
      match_scores unique constraint
      ------------------------------------------------------------
    */

    SELECT COUNT(*)
    INTO has_unique_resume_job
    FROM (
        SELECT index_name
        FROM information_schema.statistics
        WHERE table_schema = DATABASE()
          AND table_name = 'match_scores'
          AND non_unique = 0
        GROUP BY index_name
        HAVING COUNT(*) = 2
           AND SUM(
                seq_in_index = 1
                AND column_name = 'resume_id'
           ) = 1
           AND SUM(
                seq_in_index = 2
                AND column_name = 'job_id'
           ) = 1
    ) AS matching_unique_indexes;

    IF has_unique_resume_job = 0 THEN

        SELECT COUNT(*)
        INTO duplicate_pair_count
        FROM (
            SELECT resume_id, job_id
            FROM match_scores
            GROUP BY resume_id, job_id
            HAVING COUNT(*) > 1
        ) AS duplicate_pairs;

        IF duplicate_pair_count > 0 THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT =
                    'Cannot add unique match_scores key: duplicate resume/job pairs exist';
        END IF;

        ALTER TABLE match_scores
            ADD CONSTRAINT uq_match_scores_resume_job
            UNIQUE (resume_id, job_id);

    END IF;

END //

DELIMITER ;

CALL reconcile_resume_metadata_and_match_scores();

DROP PROCEDURE reconcile_resume_metadata_and_match_scores;