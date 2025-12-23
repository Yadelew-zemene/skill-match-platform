create database if NOT EXISTS skillmatch;
use skillmatch;
--users table
CREATE TABLE  users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL;
    email  VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(225) NOT NULL,
    role  ENUM("candidate",'employer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
CREATE TABLE resumes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_path VARCHAR(225) NOT NULL,
    extracted_text LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    FOREIGN  KEY (user_id) REFERENCES users(id)  ON DELETE CASCADE


);
CREATE TABLE  jobs(
    id INT AUTO_INCREMENT PRIMARY KEY,
    employer_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employer_id) REFERENCES users(id) ON DELETE CASCADE

);
CREATE TABLE resume_skills(
     id INT  AUTO_INCREMENT PRIMARY KEY,
     resume_id INT NOT NULL,
     skill VARCHAR(100) NOT NULL,
    FOREIGN  KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE

);
CREATE TABLE job_skills(
     id INT AUTO_INCREMENT PRIMARY KEY,
     job_id INT NOT NULL,
     skill VARCHAR(100) NOT NULL,
      FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE

);
CREATE TABLE match_scores(
    id INT AUTO_INCREMENT PRIMARY key,
    resume_id INT not NULL,
    job_id INT not NULL,
    score DECIMAL(5,2) NOT NULL,
    FOREIGN KEY  (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id)  ON DELETE CASCADE

);