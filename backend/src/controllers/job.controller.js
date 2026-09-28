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

export const createJob = createJobController();
