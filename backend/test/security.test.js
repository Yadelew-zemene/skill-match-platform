import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";
import jwt from "jsonwebtoken";

const databaseEnvironment = {
  DB_HOST: "127.0.0.1",
  DB_USER: "test_user",
  DB_PASSWORD: "test_password",
  DB_NAME: "skillmatch_test",
  JWT_SECRET: "test-jwt-secret",
};

Object.assign(process.env, databaseEnvironment);

const createResponse = () => {
  const response = {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  return response;
};

test("login response omits the password field", async () => {
  const { createAuthController } = await import("../src/controllers/auth.controller.js");
  const { login } = createAuthController({
    userModel: {
      findByEmail: async () => ({
        id: 1,
        name: "Candidate",
        email: "candidate@example.test",
        role: "candidate",
        password: "hash-must-not-be-returned",
      }),
    },
    bcryptLib: { compare: async () => true },
    tokenGenerator: () => "test-token",
  });
  const response = createResponse();

  await login(
    { body: { email: "candidate@example.test", password: "password" } },
    response,
  );

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.user.password, undefined);
  assert.deepEqual(response.body.user, {
    id: 1,
    name: "Candidate",
    email: "candidate@example.test",
    role: "candidate",
  });
});

test("employer job creation derives ownership from the authenticated user", async () => {
  const { createJobController } =
    await import("../src/controllers/job.controller.js");
  let createdJob;

  const createJob = createJobController({
    jobModel: {
      create: async (job) => {
        createdJob = job;
        return 42;
      },
    },
    parseSkills: async () => ({
      skills: ["javascript"],
    }),
    saveSkills: async () => undefined,
    matchJob: async () => undefined,
  });

  const response = createResponse();

  await createJob(
    {
      user: { id: 99, role: "employer" },
      body: {
        employerId: 1,
        title: "Developer",
        company: "SkillMatch",
        description: "JavaScript developer",
        application_link: "https://example.test/apply",
      },
    },
    response,
  );

  assert.equal(createdJob.employerId, 99);
  assert.equal(response.statusCode, 201);
  assert.deepEqual(response.body, {
    jobId: 42,
    skills: ["javascript"],
  });
});

test("candidate cannot create a job and public security-sensitive endpoints are unavailable", async (t) => {
  const app = (await import("../src/app.js")).default;
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => server.close());

  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  const uploadResponse = await fetch(`${baseUrl}/uploads/resumes/example.pdf`);
  const matchResponse = await fetch(`${baseUrl}/api/match/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeId: 1 }),
  });
  const candidateToken = jwt.sign(
    { id: 1, role: "candidate" },
    process.env.JWT_SECRET,
  );
  const otherResumeMatchResponse = await fetch(`${baseUrl}/api/match/calculate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${candidateToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resumeId: 2 }),
  });
  const jobResponse = await fetch(`${baseUrl}/employer/post-jobs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${candidateToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  assert.equal(uploadResponse.status, 404);
  assert.equal(matchResponse.status, 404);
  assert.equal(otherResumeMatchResponse.status, 404);
  assert.equal(jobResponse.status, 403);
});
