# SkillMatch

## Project Overview
SkillMatch is an AI-powered resume screening and job matching platform. 
Candidates upload resumes, which are parsed by AI to extract skills. 
Employers post job descriptions, and the system ranks candidates based on skill matches.
The goal of this project is to demonstrate real-world full-stack system design, not exaggerated AI claims
## Core Features(planned)
- Candidate upload resume and automatic skill extraction
- Employer job posting with required skill extraction
- AI-based candidate-job matching and ranking
- Secure authentication & role-based access
-Employer dashboard with ranked candidates

## User Roles
1. Candidate:
  - register and login
  - Upload resumes(pdf/docx),
  - view extracted skills
  view matching results-future
2. Employer: 
- register and login
- Post job descriptions
- View and rank matched candidates per job
-review match scores
## Technology Stack
- Frontend: React.js(vite)
- Backend: Node.js + Express
- Database: MySQL
- AI/ NLP: Python (spaCy & GPT)
Auth: JWT (planned)
🗂️ Project Structure 
skillmatch/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
│
├── docs/
│   └── architecture.md
│
└── README.md

## Database Schema/tables
- `users` (id, name, email, password, role)
- `resumes` (user_id, file_path, extracted_text)
- `jobs` (employer_id, title, description)
- `resume_skills` (resume_id, skill)
- `job_skills` (job_id, skill)
- `match_scores` (resume_id, job_id, score)

## System Flow
Candidate → Upload Resume → AI Parsing → Stored Skills → Match Engine → Ranked Candidates
Visualizing system flow:
*---------*         *-----------*        *----------------*
|candidate|-------->|Ai parising| ------>|Extracted Skills|
*---------*         *-----------*        *----------------*
                                             |
                                             |
                                             ^
                                       *----------------*
                                       | Matching process|
                                       *-----------------*
                                                ||
                                                |
*---------*         *-----------*        *----------------*
|Employer|-------->|Post job| ------>|Job skills|
*---------*         *-----------*        *----------------*
### Current Progress 
- Backend initialized with Express
- Frontend initialized with React (Vite)
- Clean folder structure
- Health check API implemented (`/health`)
## Databse Setup(MYSQL)
### completed
Restart WAMP server
Created skillmatch datadabase
Designed and created core tables:
users,resumes,jobs,resume_skills,job_skills,match_scores
Added MYSQL connection using mysql2 using pool
created database connection utility(src/config/db.js)
### Deliverates:
SQL schema file
Mysql database connection setup
Initial model structure for database access
### Current Status
database connected successfully
Ready to implement authentiation and cors APIs

### Features Implemented

1. User & Auth

      Candidate and employer registration & login
      JWT-based authentication & role-based access control
      Password hashing & validation

2. Resume Upload

      Candidates can upload PDF or DOCX resumes
      Automatic text extraction from uploaded files
      Skills parsed from resumes using Python skill extractor
      Skills stored in MySQL database

3. Job Posting

        Employers can post jobs with title and description
        Job skills automatically extracted from text
        Skills stored in database

4. Automatic Matching

      Resume → All Jobs: When a resume is uploaded, it is matched against all available jobs
      Job → All Resumes: When a job is posted, it is matched against all uploaded resumes
      Match score calculation (percentage based on skill overlap)
      Match scores stored in database

5. Recruiter View

      View candidates matched to a job, sorted by score descending
      Quickly see top candidates

6. Skill Extraction Engine

      Python-based skill extractor for:PDF/DOCX resume files
      Raw text (job descriptions)
      Communicates with Node.js backend via child process

