import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParseModule = require("pdf-parse");

// Handle both CommonJS and ESM wrapping
const pdfParse = typeof pdfParseModule === "function" ? pdfParseModule : pdfParseModule.default;

export const parsePdfText = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const data = await pdfParse(buffer); // ✅ function now works
  return data.text;
};
