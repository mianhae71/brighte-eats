import mysql from "mysql2/promise";
// Create MySQL Connection Pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "db_brighteeats",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
// Function to get database connection
export async function getDB() {
    return pool.getConnection();
}
