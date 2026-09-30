import fs from "fs";
import path from "path";

import {
  getJobForEmployer,
  getCandidateResumeForEmployer,
} from "../services/getcandidates.service.js";

const RESUME_DIRECTORY = path.resolve(process.cwd(), "uploads", "resumes");

const isPathInsideDirectory = (filePath, directoryPath) => {
  const relativePath = path.relative(directoryPath, filePath);

  return (
    relativePath !== "" &&
    !relativePath.startsWith("..") &&
    !path.isAbsolute(relativePath)
  );
};

const resolveResumePath = (storedFilePath) => {
  if (typeof storedFilePath !== "string" || !storedFilePath.trim()) {
    return null;
  }

  const normalizedStoredPath = storedFilePath.trim().replace(/\\/g, "/");

  let resolvedPath;

  if (path.isAbsolute(normalizedStoredPath)) {
    resolvedPath = path.resolve(normalizedStoredPath);
  } else {
    resolvedPath = path.resolve(process.cwd(), normalizedStoredPath);
  }

  if (!isPathInsideDirectory(resolvedPath, RESUME_DIRECTORY)) {
    return null;
  }

  return resolvedPath;
};

export const viewOrDownloadCandidateResume = async (req, res) => {
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

    /*
     * Step 1:
     * Verify that the employer owns this job.
     */
    const job = await getJobForEmployer(jobId, employerId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    /*
     * Step 2:
     * Verify that this candidate actually applied
     * to this specific job and retrieve the resume
     * attached to that application.
     */
    const resume = await getCandidateResumeForEmployer(jobId, candidateId);

    if (!resume) {
      return res.status(404).json({
        message: "Candidate application not found",
      });
    }

    /*
     * Step 3:
     * Only completed resumes can be viewed/downloaded.
     */
    if (resume.resume_status !== "completed") {
      return res.status(404).json({
        message: "Resume is not available",
      });
    }

    /*
     * Step 4:
     * Resolve and validate the physical file path.
     */
    const filePath = resolveResumePath(resume.file_path);

    if (!filePath) {
      console.error("BLOCKED RESUME PATH:", resume.file_path);

      return res.status(404).json({
        message: "Resume is not available",
      });
    }

    /*
     * Step 5:
     * Verify that the file actually exists.
     */
    let fileStats;

    try {
      fileStats = await fs.promises.stat(filePath);
    } catch {
      return res.status(404).json({
        message: "Resume file not found",
      });
    }

    if (!fileStats.isFile()) {
      return res.status(404).json({
        message: "Resume file not found",
      });
    }

    /*
     * Step 6:
     * Set safe response headers.
     */
    const filename =
      resume.original_filename?.trim() || `resume-${candidateId}`;

    const mimeType = resume.mime_type || "application/octet-stream";

    const shouldDownload = req.query.download === "true";

    res.setHeader("Content-Type", mimeType);

    res.setHeader("Content-Length", fileStats.size);

    res.setHeader(
      "Content-Disposition",
      `${shouldDownload ? "attachment" : "inline"}; filename="${filename.replace(/"/g, "")}"`,
    );

    res.setHeader("X-Content-Type-Options", "nosniff");

    /*
     * Step 7:
     * Stream the file instead of loading the entire
     * resume into memory.
     */
    const stream = fs.createReadStream(filePath);

    stream.on("error", (error) => {
      console.error("RESUME STREAM ERROR:", error);

      if (!res.headersSent) {
        res.status(500).json({
          message: "Failed to read resume",
        });
      } else {
        res.destroy(error);
      }
    });

    stream.pipe(res);
  } catch (error) {
    console.error("VIEW/DOWNLOAD CANDIDATE RESUME ERROR:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        message: "Failed to access resume",
      });
    }

    res.destroy(error);
  }
};
