SkillMatch Engineering Instructions
Project

SkillMatch is a full-stack recruitment platform that connects candidates and employers.

Candidates can:

register and authenticate
manage resumes
upload PDF/DOCX resumes
extract technical skills
discover jobs
receive job match scores
apply to jobs
save jobs

Employers can:

register and authenticate
manage their company/profile
create and manage jobs
define required skills
view matched candidates
review candidates
shortlist candidates

The system should be developed as a serious production-oriented portfolio application.

Current Architecture

Repository:

frontend/
backend/

Backend:

Node.js
Express.js
MySQL
JWT authentication
Python resume processing
REST API

Frontend:

Next.js
React
TypeScript
Tailwind CSS

Resume processing:

Python
PyMuPDF for PDF extraction
python-docx for DOCX extraction
deterministic technical skill extraction
canonical skill normalization
Engineering Principles
Build production-quality software, not demo code.
Prefer simple, maintainable solutions over unnecessary complexity.
Do not introduce dependencies unless there is a clear reason.
Do not rewrite working code without justification.
Do not modify unrelated features.
Preserve existing functionality unless the task explicitly changes it.
Follow the existing project architecture unless there is a documented reason to improve it.
Keep business logic out of controllers.
Put business logic in services.
Keep database access in models/data-access layers.
Validate user input at API boundaries.
Enforce authentication and authorization server-side.
Always enforce resource ownership.
Never trust IDs supplied by the client.
Never expose passwords, JWT secrets, database credentials, or other secrets.
Never hard-code production secrets.
Use environment variables for configuration and secrets.
Handle errors explicitly.
Avoid silently swallowing errors.
Keep API responses consistent.
Security Requirements

Always consider:

authentication
authorization
role-based access control
resource ownership
input validation
SQL injection
file upload security
path traversal
malicious file types
file size limits
sensitive data exposure
password security
JWT security
CORS
rate limiting where appropriate
error information leakage

Never allow a candidate to access another candidate's resources by changing an ID in the URL.

Never allow an employer to access another employer's private resources.

Database Rules

MySQL is the current database.

Before changing the schema:

Understand the existing schema.
Check existing relationships.
Check indexes and constraints.
Check existing application queries.
Avoid destructive migrations.
Preserve existing data.
Add appropriate indexes for production queries.

Do not create duplicate concepts or tables without first checking the existing schema.

API Rules

Use RESTful conventions.

Validate:

request body
query parameters
route parameters
uploaded files

Use appropriate HTTP status codes.

Do not return database errors directly to clients.

Use useful but safe error messages.

Resume Processing

Supported resume formats currently:

PDF
DOCX

Do not claim support for DOC unless DOC processing is actually implemented.

Resume processing should:

Validate upload.
Store metadata.
Extract text.
Extract skills.
Normalize skills.
Store extracted text.
Store skills.
Track processing status.
Handle failures safely.
Preserve ownership.

The current skill extraction system is deterministic/rule-based.

Do not describe it as an LLM or machine-learning model unless such a system is actually implemented.

Matching

Current candidate-job matching is primarily skill-based.

Do not invent AI/ML capabilities.

Future improvements may include:

embeddings
semantic similarity
RAG
LLM extraction
learning-to-rank

These should only be implemented when explicitly requested.

Feature Development Process

For every feature:

Inspect the existing implementation.
Understand related database tables.
Identify dependencies.
Identify security implications.
Propose a concise implementation plan.
Implement the feature.
Add or update tests.
Run relevant tests.
Run lint/type checks where available.
Run the production build.
Fix failures.
Review the final diff.
Report exactly what changed.
Report verification results.

Do not move to another feature until the current feature is complete and verified.

Testing

Prefer tests that verify actual behavior.

For backend features test:

success cases
validation failures
authentication failures
authorization failures
ownership violations
not-found cases
database edge cases
malformed input
relevant integration behavior

Do not write tests merely to increase coverage numbers.

Git

Use small, meaningful commits.

Examples:

feat: implement candidate resume management
fix: enforce resume ownership
test: add resume service tests
refactor: improve resume processing
security: harden file upload validation

Never:

amend existing commits unless explicitly requested
reset/delete user work
force push
change branches unexpectedly

Before significant changes, inspect git status.

Dependencies

Before installing a package:

Check whether an existing dependency already solves the problem.
Check whether the package is actually necessary.
Prefer mature and actively maintained packages.
Avoid adding packages for trivial functionality.
Production Readiness

Before declaring a feature production-ready, verify:

functionality
validation
authorization
ownership
error handling
database integrity
indexes
security
tests
build
configuration
logging
deployment implications

"Works locally" does not mean "production-ready."

Important Working Rule

Do not make large speculative changes.

For complex work:

ANALYZE → PLAN → IMPLEMENT → TEST → REVIEW → VERIFY

If an architectural decision is unclear, stop and explain the tradeoffs before making a destructive or difficult-to-reverse change.

Never fabricate implementation details.

Never claim a feature works unless it has been verified.