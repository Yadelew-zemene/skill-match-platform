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
    // 1. Validate pagination parameters
    const pageParam = req.query.page ?? "1";
    const limitParam = req.query.limit ?? "10";

    const isPositiveInteger = (value) =>
      typeof value === "string" && /^[1-9]\d*$/.test(value);

    if (!isPositiveInteger(pageParam) || !isPositiveInteger(limitParam)) {
      return res.status(400).json({
        message: "Page and limit must be positive integers.",
      });
    }

    const page = Number(pageParam);
    const limit = Number(limitParam);

    if (!Number.isSafeInteger(page) || !Number.isSafeInteger(limit)) {
      return res.status(400).json({
        message: "Invalid pagination values.",
      });
    }

    if (limit > 50) {
      return res.status(400).json({
        message: "Limit cannot exceed 50.",
      });
    }

    // 2. Validate search and skill filters
    const searchParam = req.query.search ?? "";
    const skillParam = req.query.skill ?? "";

    if (typeof searchParam !== "string" || typeof skillParam !== "string") {
      return res.status(400).json({
        message: "Search and skill filters must be strings.",
      });
    }

    const search = searchParam.trim();
    const skill = skillParam.trim();

    if (search.length > 150) {
      return res.status(400).json({
        message: "Search cannot exceed 150 characters.",
      });
    }

    if (skill.length > 100) {
      return res.status(400).json({
        message: "Skill cannot exceed 100 characters.",
      });
    }

    // 3. Calculate pagination offset
    const offset = (page - 1) * limit;

    // 4. Fetch jobs matching the filters
    const filters = { search, skill };

    const jobs = await Job.findActiveForCandidate(req.user.id, {
      ...filters,
      limit,
      offset,
    });

    // 5. Count only jobs matching the same filters
    const total = await Job.countActiveJobs(filters);

    // 6. Calculate filtered pagination
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching candidate jobs:", error);

    return res.status(500).json({
      message: "Failed to fetch candidate jobs.",
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
