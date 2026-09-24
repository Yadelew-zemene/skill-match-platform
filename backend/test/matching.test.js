import test from "node:test";
import assert from "node:assert/strict";

import { calculateScore } from "../src/services/match.service.js";

test("calculateScore returns percentage of job skills matched by resume", () => {
  const score = calculateScore(
    ["JavaScript", "React", "Node.js"],
    ["JavaScript", "React", "Python", "SQL"],
  );

  assert.equal(score, 50);
});

test("calculateScore is case-insensitive and trims skills", () => {
  const score = calculateScore(
    [" JavaScript ", "REACT"],
    ["javascript", "react"],
  );

  assert.equal(score, 100);
});

test("calculateScore removes duplicate skills", () => {
  const score = calculateScore(
    ["JavaScript", "javascript", "React"],
    ["JavaScript", "React", "React"],
  );

  assert.equal(score, 100);
});

test("calculateScore returns zero when job has no skills", () => {
  const score = calculateScore(["JavaScript", "React"], []);

  assert.equal(score, 0);
});

test("calculateScore returns zero when no skills match", () => {
  const score = calculateScore(["JavaScript", "React"], ["Python", "SQL"]);

  assert.equal(score, 0);
});
