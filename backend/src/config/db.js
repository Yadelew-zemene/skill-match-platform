import mysql from 'mysql2/promise';
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Db@vintage2019",
  database: "skillmatch",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


export default pool;