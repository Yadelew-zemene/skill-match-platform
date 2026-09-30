import Job from "../models/job.model.js";

const ALLOWED_STATUSES = ["active", "closed"];

const validateJobId = (jobId) => {
  const parsedJobId = Number(jobId);

  if (!Number.isInteger(parsedJobId) || parsedJobId <= 0) {
    throw new Error("Invalid job ID");
  }

  return parsedJobId;
};

const validateJobData = ({ title, description, company, application_link }) => {
  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof description !== "string" ||
    !description.trim() ||
    typeof company !== "string" ||
    !company.trim() ||
    typeof application_link !== "string" ||
    !application_link.trim()
  ) {
    throw new Error(
      "Title, description, company, and application link are required",
    );
  }

  return {
    title: title.trim(),
    description: description.trim(),
    company: company.trim(),
    application_link: application_link.trim(),
  };
};

export const getEmployerJob = async (jobId, employerId) => {
  const parsedJobId = validateJobId(jobId);

  return Job.findByIdForEmployer(parsedJobId, employerId);
};

export const updateEmployerJob = async (jobId, employerId, jobData) => {
  const parsedJobId = validateJobId(jobId);
  const validatedData = validateJobData(jobData);

  const existingJob = await Job.findByIdForEmployer(parsedJobId, employerId);

  if (!existingJob) {
    return null;
  }

  await Job.updateForEmployer(parsedJobId, employerId, validatedData);

  return Job.findByIdForEmployer(parsedJobId, employerId);
};

export const updateEmployerJobStatus = async (jobId, employerId, status) => {
  const parsedJobId = validateJobId(jobId);

  if (!ALLOWED_STATUSES.includes(status)) {
    throw new Error("Invalid job status");
  }

  const existingJob = await Job.findByIdForEmployer(parsedJobId, employerId);

  if (!existingJob) {
    return null;
  }

  await Job.updateStatusForEmployer(parsedJobId, employerId, status);

  return Job.findByIdForEmployer(parsedJobId, employerId);
};

export const deleteEmployerJob = async (jobId, employerId) => {
  const parsedJobId = validateJobId(jobId);

  const existingJob = await Job.findByIdForEmployer(parsedJobId, employerId);

  if (!existingJob) {
    return null;
  }

  await Job.deleteForEmployer(parsedJobId, employerId);

  return existingJob;
};
