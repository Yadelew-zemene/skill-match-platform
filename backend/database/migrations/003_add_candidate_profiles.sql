USE skillmatch;

CREATE TABLE IF NOT EXISTS candidate_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL UNIQUE,

    professional_title VARCHAR(150) NULL,
    bio TEXT NULL,
    phone VARCHAR(30) NULL,
    location VARCHAR(150) NULL,
    linkedin_url VARCHAR(500) NULL,
    github_url VARCHAR(500) NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_candidate_profiles_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


ALTER TABLE candidate_profiles
    ADD COLUMN profile_image_path VARCHAR(500) NULL
    AFTER github_url;