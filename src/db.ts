import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();
// Create MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.HOST,
  user:  process.env.USER,
  password:  process.env.PW,
  database:  process.env.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to get database connection
export async function getDB() {
  return pool.getConnection();
}