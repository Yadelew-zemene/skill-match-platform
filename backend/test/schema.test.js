import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const databaseDirectory = path.resolve(testDirectory, "../database");
const schemaPath = path.join(databaseDirectory, "schema.sql");
const migrationPath = path.join(
  databaseDirectory,
  "migrations",
  "001_reconcile_resume_metadata_and_match_scores.sql",
);

const normalize = (sql) => sql.replace(/\s+/g, " ").toLowerCase();

test("fresh schema defines the resume fields used by the Resume model", async () => {
  const schema = normalize(await readFile(schemaPath, "utf8"));

  for (const definition of [
    "original_filename varchar(255) not null",
    "mime_type varchar(100) null",
    "file_size int null",
    "status enum('processing', 'completed', 'failed') not null default 'processing'",
    "is_active boolean not null default false",
    "processing_error text null",
  ]) {
    assert.ok(
      schema.includes(definition),
      `Missing schema definition: ${definition}`,
    );
  }
});

test("fresh schema prevents duplicate match scores for one resume/job pair", async () => {
  const schema = normalize(await readFile(schemaPath, "utf8"));

  assert.match(
    schema,
    /constraint uq_match_scores_resume_job unique \(resume_id, job_id\)/,
  );
});

test("migration adds missing schema elements and protects duplicate data", async () => {
  const migration = normalize(await readFile(migrationPath, "utf8"));

  for (const column of [
    "original_filename",
    "mime_type",
    "file_size",
    "status",
    "is_active",
    "processing_error",
  ]) {
    assert.match(migration, new RegExp(`column_name = '${column}'`));
  }

  assert.match(migration, /update resumes set original_filename/);

  assert.match(
    migration,
    /cannot add unique match_scores key: duplicate resume\/job pairs exist/,
  );

  assert.match(
    migration,
    /add constraint uq_match_scores_resume_job unique \(resume_id, job_id\)/,
  );

  assert.doesNotMatch(migration, /delete from resumes|drop table|drop column/);
});

test("fresh schema defines the applications table", async () => {
  const schema = normalize(await readFile(schemaPath, "utf8"));

  assert.match(schema, /create\s+table\s+applications\s*\(/);

  assert.match(schema, /job_id\s+int\s+not\s+null/);

  assert.match(schema, /candidate_id\s+int\s+not\s+null/);

  assert.match(schema, /resume_id\s+int\s+not\s+null/);

  assert.match(schema, /cover_letter\s+text\s+null/);

  assert.match(
    schema,
    /status\s+enum\s*\(\s*'pending'\s*,\s*'reviewing'\s*,\s*'shortlisted'\s*,\s*'rejected'\s*,\s*'accepted'\s*\)\s+not\s+null\s+default\s+'pending'/,
  );

  assert.match(schema, /applied_at\s+timestamp\s+default\s+current_timestamp/);

  assert.match(
    schema,
    /updated_at\s+timestamp\s+default\s+current_timestamp\s+on\s+update\s+current_timestamp/,
  );
});

test("applications prevent duplicate applications for the same candidate and job", async () => {
  const schema = normalize(await readFile(schemaPath, "utf8"));

  assert.match(
    schema,
    /constraint\s+uq_application_job_candidate\s+unique\s*\(\s*job_id\s*,\s*candidate_id\s*\)/,
  );
});

test("applications reference jobs, candidates, and resumes", async () => {
  const schema = normalize(await readFile(schemaPath, "utf8"));

  assert.match(
    schema,
    /foreign\s+key\s*\(\s*job_id\s*\)\s+references\s+jobs\s*\(\s*id\s*\)\s+on\s+delete\s+cascade/,
  );

  assert.match(
    schema,
    /foreign\s+key\s*\(\s*candidate_id\s*\)\s+references\s+users\s*\(\s*id\s*\)\s+on\s+delete\s+cascade/,
  );

  assert.match(
    schema,
    /foreign\s+key\s*\(\s*resume_id\s*\)\s+references\s+resumes\s*\(\s*id\s*\)\s+on\s+delete\s+restrict/,
  );
});

test("applications define indexes for common queries", async () => {
  const schema = normalize(await readFile(schemaPath, "utf8"));

  for (const index of [
    /index\s+idx_applications_job\s*\(\s*job_id\s*\)/,
    /index\s+idx_applications_candidate\s*\(\s*candidate_id\s*\)/,
    /index\s+idx_applications_resume\s*\(\s*resume_id\s*\)/,
    /index\s+idx_applications_status\s*\(\s*status\s*\)/,
  ]) {
    assert.match(schema, index);
  }
});

test("application migration creates the applications table safely", async () => {
  const migrationPath = path.join(
    databaseDirectory,
    "migrations",
    "002_add_applications.sql",
  );

  const migration = normalize(await readFile(migrationPath, "utf8"));

  assert.match(
    migration,
    /create\s+table\s+if\s+not\s+exists\s+applications\s*\(/,
  );

  assert.match(
    migration,
    /constraint\s+uq_application_job_candidate\s+unique\s*\(\s*job_id\s*,\s*candidate_id\s*\)/,
  );

  assert.match(
    migration,
    /foreign\s+key\s*\(\s*job_id\s*\)\s+references\s+jobs\s*\(\s*id\s*\)\s+on\s+delete\s+cascade/,
  );

  assert.match(
    migration,
    /foreign\s+key\s*\(\s*candidate_id\s*\)\s+references\s+users\s*\(\s*id\s*\)\s+on\s+delete\s+cascade/,
  );

  assert.match(
    migration,
    /foreign\s+key\s*\(\s*resume_id\s*\)\s+references\s+resumes\s*\(\s*id\s*\)\s+on\s+delete\s+restrict/,
  );

  assert.doesNotMatch(migration, /drop\s+table|drop\s+column|delete\s+from/);
});