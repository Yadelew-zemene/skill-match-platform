import test from "node:test";
import assert from "node:assert/strict";
import { createEmployerApplicationService } from "../src/services/employer-application.service.js";

test("rejects access when employer does not own the job", async () => {
  const service = createEmployerApplicationService({
    database: {
      execute: async () => [[]],
    },
  });

  await assert.rejects(
    () => service.getApplications(10, 99),
    (error) => {
      assert.equal(error.statusCode, 404);
      return true;
    },
  );
});

test("returns applications for an employer-owned job", async () => {
  const applications = [
    {
      application_id: 1,
      candidate_id: 5,
      status: "pending",
      match_score: 85,
    },
  ];

  const applicationModel = {
    findByJobId: async () => applications,
  };

  const service = createEmployerApplicationService({
    database: {
      execute: async () => [[{ id: 10 }]],
    },
    applicationModel,
  });

  const result = await service.getApplications(10, 7);

  assert.deepEqual(result, applications);
});

test("rejects invalid application status", async () => {
  const service = createEmployerApplicationService();

  await assert.rejects(
    () =>
      service.updateStatus({
        applicationId: 1,
        employerId: 7,
        status: "invalid",
      }),
    (error) => {
      assert.equal(error.statusCode, 400);
      return true;
    },
  );
});

test("rejects updating an application that does not exist", async () => {
  const service = createEmployerApplicationService({
    applicationModel: {
      findById: async () => null,
    },
  });

  await assert.rejects(
    () =>
      service.updateStatus({
        applicationId: 1,
        employerId: 7,
        status: "shortlisted",
      }),
    (error) => {
      assert.equal(error.statusCode, 404);
      return true;
    },
  );
});

test("updates status for an employer-owned application", async () => {
  let updated;

  const applicationModel = {
    findById: async () => ({
      id: 1,
      job_id: 10,
      candidate_id: 5,
    }),

    updateStatus: async (applicationId, status) => {
      updated = { applicationId, status };
    },
  };

  const service = createEmployerApplicationService({
    database: {
      execute: async () => [[{ id: 10 }]],
    },
    applicationModel,
  });

  const result = await service.updateStatus({
    applicationId: 1,
    employerId: 7,
    status: "shortlisted",
  });

  assert.deepEqual(result, {
    applicationId: 1,
    status: "shortlisted",
  });

  assert.deepEqual(updated, {
    applicationId: 1,
    status: "shortlisted",
  });
});
