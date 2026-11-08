
import "dotenv/config";
import mysql from "mysql2/promise";
import fs from "node:fs";

const requiredConfig = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];

const missingConfig = requiredConfig.filter((key) => !process.env[key]);

if (missingConfig.length > 0) {
  throw new Error(
    `Missing required database configuration: ${missingConfig.join(", ")}`,
  );
}

let ssl;

if (process.env.DB_SSL === "true") {
  const ca =
    process.env.DB_SSL_CA ||
    (process.env.DB_SSL_CA_PATH
      ? fs.readFileSync(process.env.DB_SSL_CA_PATH, "utf8")
      : undefined);

  ssl = {
    rejectUnauthorized: true,
    ...(ca ? { ca } : {}),
  };
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ...(ssl ? { ssl } : {}),
});

export default pool;