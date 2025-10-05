import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.join(__dirname, '.env') });

export const pool = mysql.createPool({
  host: process.env['DB_HOST'] ?? 'localhost',
  user: process.env['DB_USER'] ?? 'root',
  password: process.env['DB_PASS'] ?? 'megadelicias123',
  database: process.env['DB_NAME'] ?? 'academia',
  port: Number(process.env['DB_PORT'] ?? 3306),
  waitForConnections: true,
  connectionLimit: 10,
});
