import db from "../config/db.js"

export const getCandidateDashboardData = async (userId) => {
  const query = `
    SELECT 
        u.id AS candidate_id,
        u.name,
        u.email,

        j.id AS job_id,
        j.title,
        j.campanyName AS company,
        j.description,
        j.applicatin_link AS application_link,

        m.score

    FROM users u
    JOIN resumes r ON r.user_id = u.id
    JOIN match_scores m ON m.resume_id = r.id
    JOIN jobs j ON j.id = m.job_id

    WHERE u.id = ?
    ORDER BY m.score DESC
    LIMIT 10
  `;

  const [rows] = await db.query(query, [userId]);
  return rows;
};
// {
//     "candidate": {
//         "id": 17,
//         "name": "Yadelew Zemene",
//         "email": "yadelew@skillmatch.com"
//     },
//     "matchedJobs": [
//         {
//             "jobId": 15,
//             "title": "front end dev",
//             "company": null,
//             "description": "Looking for node.js  and python developer with MySQL and Docker git  java flask mongodb",
//             "applicationLink": null,
//             "score": "88.00"
//         },
//         {
//             "jobId": 14,
//             "title": "front end dev",
//             "company": null,
//             "description": "Looking for node.js  and python developer with MySQL and Docker git  java flask",
//             "applicationLink": null,
//             "score": "86.00"
//         },
//         {
//             "jobId": 14,
//             "title": "front end dev",
//             "company": null,
//             "description": "Looking for node.js  and python developer with MySQL and Docker git  java flask",
//             "applicationLink": null,
//             "score": "57.00"
//         },
//         {
//             "jobId": 14,
//             "title": "front end dev",
//             "company": null,
//             "description": "Looking for node.js  and python developer with MySQL and Docker git  java flask",
//             "applicationLink": null,
//             "score": "57.00"
//         },
//         {
//             "jobId": 13,
//             "title": "Backend Developer",
//             "company": null,
//             "description": "Node.js, SQL, Docker, Next.js",
//             "applicationLink": null,
//             "score": "50.00"
//         },
//         {
//             "jobId": 15,
//             "title": "front end dev",
//             "company": null,
//             "description": "Looking for node.js  and python developer with MySQL and Docker git  java flask mongodb",
//             "applicationLink": null,
//             "score": "50.00"
//         },
//         {
//             "jobId": 13,
//             "title": "Backend Developer",
//             "company": null,
//             "description": "Node.js, SQL, Docker, Next.js",
//             "applicationLink": null,
//             "score": "50.00"
//         },
//         {
//             "jobId": 13,
//             "title": "Backend Developer",
//             "company": null,
//             "description": "Node.js, SQL, Docker, Next.js",
//             "applicationLink": null,
//             "score": "50.00"
//         },
//         {
//             "jobId": 15,
//             "title": "front end dev",
//             "company": null,
//             "description": "Looking for node.js  and python developer with MySQL and Docker git  java flask mongodb",
//             "applicationLink": null,
//             "score": "50.00"
//         },
//         {
//             "jobId": 13,
//             "title": "Backend Developer",
//             "company": null,
//             "description": "Node.js, SQL, Docker, Next.js",
//             "applicationLink": null,
//             "score": "0.00"
//         }
//     ]
// }