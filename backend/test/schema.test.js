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
    assert.ok(schema.includes(definition), `Missing schema definition: ${definition}`);
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
