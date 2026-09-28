import Job from "../models/job.model.js";
import { matchJobToAllResumes } from "../services/match.service.js";

import { parseJobSkills } from "../services/jobParser.service.js";
import { saveJobSkills } from "../services/jobSkill.service.js";

export const createJobController = ({
  jobModel = Job,
  parseSkills = parseJobSkills,
  saveSkills = saveJobSkills,
  matchJob = matchJobToAllResumes,
} = {}) => async (req, res) => {
  try {
    
        const jobId = await jobModel.create({
          employerId: req.user.id,
          title: req.body.title,
          description: req.body.description,
          application_link: req.body.application_link,
          company:req.body.company
        });

          const parsed = await parseSkills(req.body.description);

          await saveSkills(jobId, parsed.skills);
          await matchJob(jobId);

          res.status(201).json({
            jobId,
            skills: parsed.skills,
          });
          

  } catch (err) {
        console.error("JOB CREATE ERROR", err);
        res.status(500).json({
        message: "Job creation failed"
        });
  }


  };
export const getCandidateJobs = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 10, 1),
      50,
    );

    const offset = (page - 1) * limit;

    const jobs = await Job.findActiveForCandidate(req.user.id, {
      limit,
      offset,
    });

    const total = await Job.countActiveJobs();

    res.status(200).json({
      jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET CANDIDATE JOBS ERROR", error);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
};
export const getCandidateJob = async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    if (!Number.isInteger(jobId) || jobId <= 0) {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }

    const job = await Job.findActiveByIdForCandidate(jobId, req.user.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({ job });
  } catch (error) {
    console.error("GET CANDIDATE JOB ERROR", error);

    res.status(500).json({
      message: "Failed to fetch job",
    });
  }
};
export const createJob = createJobController();
