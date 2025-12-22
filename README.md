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

## Database Schema
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

