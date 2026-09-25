import test from "node:test";
import assert from "node:assert/strict";
import { createApplicationService } from "../src/services/application.service.js";

const createDatabase = ({
  jobs = [{ id: 10 }],
  resumes = [{ id: 5 }],
} = {}) => ({
  execute: async (sql) => {
    if (sql.includes("FROM jobs")) {
      return [jobs];
    }

    if (sql.includes("FROM resumes")) {
      return [resumes];
    }

    throw new Error("Unexpected query");
  },
});

test("creates an application for a valid active job and resume", async () => {
  let createdApplication;

  const applicationModel = {
    findByJobAndCandidate: async () => null,
    create: async (data) => {
      createdApplication = data;
      return 25;
    },
  };

  const service = createApplicationService({
    database: createDatabase(),
    applicationModel,
  });

  const result = await service({
    jobId: 10,
    candidateId: 3,
    resumeId: 5,
    coverLetter: "I am interested in this position.",
  });

  assert.equal(result, 25);

  assert.deepEqual(createdApplication, {
    jobId: 10,
    candidateId: 3,
    resumeId: 5,
    coverLetter: "I am interested in this position.",
  });
});

test("rejects an inactive or missing job", async () => {
  const service = createApplicationService({
    database: createDatabase({
      jobs: [],
    }),
  });

  await assert.rejects(
    () =>
      service({
        jobId: 10,
        candidateId: 3,
        resumeId: 5,
      }),
    (error) => {
      assert.equal(error.statusCode, 404);
      return true;
    },
  );
});

test("rejects a resume that does not belong to the candidate", async () => {
  const service = createApplicationService({
    database: createDatabase({
      resumes: [],
    }),
  });

  await assert.rejects(
    () =>
      service({
        jobId: 10,
        candidateId: 3,
        resumeId: 99,
      }),
    (error) => {
      assert.equal(error.statusCode, 400);
      return true;
    },
  );
});

test("rejects duplicate applications", async () => {
  const applicationModel = {
    findByJobAndCandidate: async () => ({
      id: 20,
      job_id: 10,
      candidate_id: 3,
    }),
  };

  const service = createApplicationService({
    database: createDatabase(),
    applicationModel,
  });

  await assert.rejects(
    () =>
      service({
        jobId: 10,
        candidateId: 3,
        resumeId: 5,
      }),
    (error) => {
      assert.equal(error.statusCode, 409);
      return true;
    },
  );
});
