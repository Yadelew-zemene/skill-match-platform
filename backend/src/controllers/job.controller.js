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

        const skills = await parseSkills(req.body.description);
        await saveSkills(jobId, skills);
        await matchJob(jobId);

        res.status(201).json({ jobId, skills });
  } catch (err) {
        console.error("JOB CREATE ERROR", err);
        res.status(500).json({
        message: "Job creation failed"
        });
}

};

export const createJob = createJobController();
