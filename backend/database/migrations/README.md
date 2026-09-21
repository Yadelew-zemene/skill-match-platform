# Database migrations

`001_reconcile_resume_metadata_and_match_scores.sql` upgrades the original
SkillMatch schema to the resume metadata and match-score uniqueness expected by
the current backend.

The migration is idempotent for the targeted additions. It derives an existing
row's `original_filename` from its `file_path`; it leaves unknown MIME type and
file size as `NULL`, and applies `processing`/`FALSE` defaults for newly added
status fields. It does not delete or alter existing application records.

Before adding the match-score unique key, it checks for duplicate
`(resume_id, job_id)` pairs and fails without modifying those records if any
exist. Resolve those duplicates through an approved data-reconciliation process
before retrying the migration.

Run the migration with a MySQL-compatible client against an approved target
database after taking the normal backup and review steps.
