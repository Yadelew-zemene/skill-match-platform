USE skillmatch;

CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,

    job_id INT NOT NULL,
    candidate_id INT NOT NULL,
    resume_id INT NOT NULL,

    cover_letter TEXT NULL,

    status ENUM(
        'pending',
        'reviewing',
        'shortlisted',
        'rejected',
        'accepted'
    ) NOT NULL DEFAULT 'pending',

    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_application_job_candidate
        UNIQUE (job_id, candidate_id),

    FOREIGN KEY (job_id)
        REFERENCES jobs(id)
        ON DELETE CASCADE,

    FOREIGN KEY (candidate_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (resume_id)
        REFERENCES resumes(id)
        ON DELETE RESTRICT,

    INDEX idx_applications_job (job_id),
    INDEX idx_applications_candidate (candidate_id),
    INDEX idx_applications_resume (resume_id),
    INDEX idx_applications_status (status)
);