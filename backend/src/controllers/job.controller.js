import Job from "../models/job.model.js";
import { matchJobToAllResumes } from "../services/match.service.js";

import { parseJobSkills } from "../services/jobParser.service.js";
import { saveJobSkills } from "../services/jobSkill.service.js";

export const createJob = async (req, res) => {
  try {
    
        const jobId = await Job.create({
          employerId: req.user.id,
          title: req.body.title,
          description: req.body.description,
          application_link: req.body.application_link,
          company:req.body.company
        });

        const skills = await parseJobSkills(req.body.description);
        await saveJobSkills(jobId, skills);
        await matchJobToAllResumes(jobId);

        res.status(201).json({ jobId, skills });
  } catch (err) {
        console.error("JOB CREATE ERROR", err);
        res.status(500).json({
        message: "Job creation failed",
        error: err.message || err
        });
}

};
