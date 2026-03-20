import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 10,      // max 10 parallel connections
  queueLimit: 0,
  enableKeepAlive: true,    // prevents idle connection drops
  keepAliveInitialDelay: 0
});

// Test connection on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.log("❌ MySQL Connection Failed:", err);
  } else {
    console.log("✅ MySQL Pool Connected");
    connection.release(); // release back to pool
  }
});

export default pool;



// import mysql from "mysql2";
// import dotenv from "dotenv";
// dotenv.config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   ssl: { rejectUnauthorized: false }
// });

// db.connect((err) => {
//   if (err) {
//     console.log("❌ MySQL Connection Failed:", err);
//   } else {
//     console.log("✅ MySQL Connected");
//   }
// });

// export default db;