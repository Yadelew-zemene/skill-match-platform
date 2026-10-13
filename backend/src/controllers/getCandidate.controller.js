// import {
//   getJobForEmployer,
//   getCandidatesForJob,
//   getCandidateDetail,
// } from "../services/getcandidates.service.js";

// export const viewCandidates = async (req, res) => {
//   try {
//     const jobId = Number(req.params.jobId);

//     if (!Number.isInteger(jobId) || jobId <= 0) {
//       return res.status(400).json({
//         message: "Invalid job ID",
//       });
//     }

//     const employerId = req.user.id;

//     const job = await getJobForEmployer(jobId, employerId);

//     if (!job) {
//       return res.status(404).json({
//         message: "Job not found",
//       });
//     }

//     const candidates = await getCandidatesForJob(jobId);

//     return res.status(200).json({
//       job: {
//         id: job.id,
//         title: job.title,
//         company: job.company,
//         status: job.status,
//       },
//       candidates,
//     });
//   } catch (error) {
//     console.error("VIEW CANDIDATES ERROR", error);

//     return res.status(500).json({
//       message: "Failed to fetch candidates",
//     });
//   }
// };

// export const viewCandidateDetail = async (req, res) => {
//   try {
//     const jobId = Number(req.params.jobId);
//     const candidateId = Number(req.params.candidateId);

//     if (!Number.isInteger(jobId) || jobId <= 0) {
//       return res.status(400).json({
//         message: "Invalid job ID",
//       });
//     }

//     if (!Number.isInteger(candidateId) || candidateId <= 0) {
//       return res.status(400).json({
//         message: "Invalid candidate ID",
//       });
//     }

//     const employerId = req.user.id;

//     // Verify that the job exists and belongs to this employer.
//     const job = await getJobForEmployer(jobId, employerId);

//     if (!job) {
//       return res.status(404).json({
//         message: "Job not found",
//       });
//     }

//     // Verify that this candidate applied to this job.
//     const candidate = await getCandidateDetail(jobId, candidateId);

//     if (!candidate) {
//       return res.status(404).json({
//         message: "Candidate not found for this job",
//       });
//     }

//     return res.status(200).json({
//       job: {
//         id: job.id,
//         title: job.title,
//         company: job.company,
//         status: job.status,
//       },
//       candidate,
//     });
//   } catch (error) {
//     console.error("VIEW CANDIDATE DETAIL ERROR", error);

//     return res.status(500).json({
//       message: "Failed to fetch candidate details",
//     });
//   }
// };
// export const getCandidateResumeForEmployer = async (jobId, candidateId) => {
//   const [rows] = await db.query(
//     `
//     SELECT
//       a.id AS application_id,
//       a.job_id,
//       a.candidate_id,
//       a.resume_id,

//       r.file_path,
//       r.original_filename,
//       r.mime_type,
//       r.file_size,
//       r.status AS resume_status

//     FROM applications a

//     INNER JOIN resumes r
//       ON r.id = a.resume_id

//     WHERE a.job_id = ?
//       AND a.candidate_id = ?

//     LIMIT 1
//     `,
//     [jobId, candidateId],
//   );

//   return rows[0] || null;
// };
import fs from "fs/promises";
import path from "path";

import {
  getJobForEmployer,
  getCandidatesForJob,
  getCandidateDetail,
  getCandidatePhotoForEmployer,
  getCandidateProfileImageForEmployer,
} from "../services/getcandidates.service.js";

export const viewCandidates = async (req, res) => {
  try {
    const jobId = Number(req.params.jobId);

    if (!Number.isInteger(jobId) || jobId <= 0) {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }

    const employerId = req.user.id;

    const job = await getJobForEmployer(jobId, employerId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const candidates = await getCandidatesForJob(jobId);

    return res.status(200).json({
      job: {
        id: job.id,
        title: job.title,
        company: job.company,
        status: job.status,
      },
      candidates,
    });
  } catch (error) {
    console.error("VIEW CANDIDATES ERROR", error);

    return res.status(500).json({
      message: "Failed to fetch candidates",
    });
  }
};

export const viewCandidateDetail = async (req, res) => {
  try {
    const jobId = Number(req.params.jobId);
    const candidateId = Number(req.params.candidateId);

    if (!Number.isInteger(jobId) || jobId <= 0) {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }

    if (!Number.isInteger(candidateId) || candidateId <= 0) {
      return res.status(400).json({
        message: "Invalid candidate ID",
      });
    }

    const employerId = req.user.id;

    // 1. Verify that this employer owns the job.
    const job = await getJobForEmployer(jobId, employerId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // 2. Verify that this candidate applied to this job.
    const candidate = await getCandidateDetail(jobId, candidateId);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found for this job",
      });
    }

    return res.status(200).json({
      job: {
        id: job.id,
        title: job.title,
        company: job.company,
        status: job.status,
      },
      candidate,
    });
  } catch (error) {
    console.error("VIEW CANDIDATE DETAIL ERROR", error);

    return res.status(500).json({
      message: "Failed to fetch candidate details",
    });
  }
};

/**
 * Serve a candidate's profile image to an authorized employer.
 *
 * Authorization:
 * 1. Employer must own the job.
 * 2. Candidate must have applied to that job.
 */
export const viewCandidateProfileImage = async (req, res) => {
  try {
    const jobId = Number(req.params.jobId);
    const candidateId = Number(req.params.candidateId);

    if (!Number.isInteger(jobId) || jobId <= 0) {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }

    if (!Number.isInteger(candidateId) || candidateId <= 0) {
      return res.status(400).json({
        message: "Invalid candidate ID",
      });
    }

    const employerId = req.user.id;

    // 1. Verify employer owns the job.
    const job = await getJobForEmployer(jobId, employerId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // 2. Verify candidate applied to this job and get image.
    const profile = await getCandidateProfileImageForEmployer(
      jobId,
      candidateId,
    );

    if (!profile?.profile_image_path) {
      return res.status(404).json({
        message: "Candidate profile photo not found",
      });
    }

    const imagePath = path.resolve(profile.profile_image_path);

    try {
      await fs.access(imagePath);
    } catch {
      return res.status(404).json({
        message: "Candidate profile photo file not found",
      });
    }

    return res.sendFile(imagePath);
  } catch (error) {
    console.error("VIEW CANDIDATE PROFILE IMAGE ERROR", error);

    return res.status(500).json({
      message: "Failed to load candidate profile photo",
    });
  }
};
