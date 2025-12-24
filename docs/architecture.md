# SkillMatch – System Architecture

## 1. Overview
SkillMatch is AI-based resume screening and job matching platform created to automate skills-based candidate–job matching.

The system parses skills from job seekers’ resumes, compares them with employers’ job descriptions through a matching algorithm and ranks the candidates for each position.

Like top-down architecture, Modularity of Layers plays a key role for the coherence between tiers and abstractions and provide other general design benefits such as clarity, scalability or maintainability..

---

## 2. User Roles and Permissions

### 2.1 Candidate

**Responsibilities**

* Register and log in
* Upload resume int PDF/DOCX format
* View extracted skills
* View matching results (optional)

**Restrictions**

* Cannot post jobs
* Cannot view other candidates
* Cannot access employer-only endpoints

---

### 2.2 Employer

**Responsibilities**

* Register and log in
* Post job descriptions
* View ranked candidates per job
* Review match scores

**Restrictions**

* Cannot upload resumes
* Cannot modify candidate data

---

## 3. High-Level System Architecture

The system is divided into four main layers:

```
Frontend (React)
   |
   v
Backend API (Node.js + Express)
   |
   v
AI Processing Service (Python)-extracting and matching service
   |
   v
Database (MySQL)
```

Each layer has a **single responsibility**, reducing complexity and improving scalability.

---

## 4. Component Breakdown

### 4.1 Frontend (React.js)

**Responsibilities**

* User interface for candidates and employers
* Authentication handling (JWT storage)
* File upload and form submission
* Display of skills, jobs, and match scores

**Key Pages**

* Login / Register
* Candidate Dashboard
* Employer Dashboard

---

### 4.2 Backend (Node.js + Express)

**Responsibilities**

* Authentication and authorization
* Resume upload handling
* Job posting management
* Communication with AI service
* Matching logic execution

**Core Modules**

* Controllers: Request handling
* Routes: API endpoints
* Services: Business logic
* Middlewares: Auth & role checks

---

### 4.3 AI Service (Python)

**Responsibilities**

* Extract text from resumes and job descriptions
* Identify skills using NLP tools (spaCy, GPT)
* Return structured skill data

**Reason for Separation**

* Keeps Node.js backend lightweight
* Allows independent AI improvements
* Enables future model upgrades without breaking API

---

### 4.4 Database (MySQL)

**Responsibilities**

* Persistent data storage
* Structured relationships between users, resumes, jobs, and skills

**Core Tables**

* users* resumes    * resume_skills     * job_skills
* match_scores      * jobs


---

## 5. Data Flow Explanation

### 5.1 Resume Processing Flow

1. Candidate uploads resume
2. Backend stores file path
3. Backend sends file/text to AI service
4. AI extracts skills
5. Skills stored in `resume_skills`

---

### 5.2 Job Processing Flow

1. Employer posts job description
2. Backend sends description to AI service
3. AI extracts required skills
4. Skills stored in `job_skills`

---

### 5.3 Matching Flow

1. Backend retrieves resume skills and job skills
2. Skills are compared
3. Match score is calculated
4. Result stored in `match_scores`
5. Employer views ranked candidates

---

## 6. Matching Algorithm (Initial Version)

```
match_score = (number of matched skills / total job skills) * 100
```

**Example**

* Job Skills: React, Node, MySQL
* Resume Skills: React, Node, Git
* Match Score: (2 / 3) × 100 = 66.67%
---

## 7. Security Design

* Passwords hashed using bcrypt
* Authentication via JWT
* Role-based access middleware
* File upload validation
---

## 8. Summary

SkillMatch is designed as a clean, modular full-stack system where:

* AI handles intelligence
* Backend handles logic 
* Frontend handles user experience
* Database ensures structure
