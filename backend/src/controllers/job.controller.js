import Job from "../models/job.model.js";

import { parseJobSkills } from "../services/jobParser.service.js";
import { saveJobSkills } from "../services/jobSkill.service.js";

export const createJob = async (req, res) => {
  try {
    
    const jobId = await Job.create({
      employerId: req.user.id,
      title: req.body.title,
      description: req.body.description,
    });

    const skills = await parseJobSkills(req.body.description);
    await saveJobSkills(jobId, skills);

    res.status(201).json({ jobId, skills });
  } catch (err) {
  console.error("JOB CREATE ERROR 👉", err);
  res.status(500).json({
    message: "Job creation failed",
    error: err.message || err
  });
}

};
