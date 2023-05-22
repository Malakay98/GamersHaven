import mysql from "mysql2/promise";
import * as dotenv from 'dotenv';
dotenv.config()

const db = await mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default db;