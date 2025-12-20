# SkillMatch

## Project Overview
SkillMatch is an AI-powered resume screening and job matching platform. 
Candidates upload resumes, which are parsed by AI to extract skills. 
Employers post job descriptions, and the system ranks candidates based on skill matches.

## Core Features
- Candidate upload and skill extraction
- Employer job posting
- AI-based candidate-job matching and ranking
- User authentication and role-based access

## User Roles
1. Candidate: Upload resumes, view extracted skills
2. Employer: Post jobs, view and rank matched candidates

## Technology Stack
- Frontend: React.js
- Backend: Node.js + Express
- Database: MySQL
- AI: Python (spaCy & GPT)

## Database Schema
- `users` (id, name, email, password, role)
- `resumes` (user_id, file_path, extracted_text)
- `jobs` (employer_id, title, description)
- `resume_skills` (resume_id, skill)
- `job_skills` (job_id, skill)
- `match_scores` (resume_id, job_id, score)

## System Flow
Candidate → Upload Resume → AI Parsing → Stored Skills → Match Engine → Ranked Candidates
