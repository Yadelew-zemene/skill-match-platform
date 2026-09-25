CREATE DATABASE IF NOT EXISTS skillmatch;
USE skillmatch;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(225) NOT NULL,
    role ENUM('candidate', 'employer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_path VARCHAR(225) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NULL,
    file_size INT NULL,
    extracted_text LONGTEXT,
    status ENUM('processing', 'completed', 'failed') NOT NULL DEFAULT 'processing',
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    processing_error TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employer_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    application_link VARCHAR(100) NOT NULL,
    company VARCHAR(20),
    status ENUM('active', 'closed') DEFAULT 'active',
    FOREIGN KEY (employer_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE resume_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resume_id INT NOT NULL,
    skill VARCHAR(100) NOT NULL,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

CREATE TABLE job_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    skill VARCHAR(100) NOT NULL,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

CREATE TABLE match_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resume_id INT NOT NULL,
    job_id INT NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    CONSTRAINT uq_match_scores_resume_job UNIQUE (resume_id, job_id),
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);
CREATE TABLE applications (
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