const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function importDb() {
    console.log("Starting DB import...");
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || 'localhost',
            port: parseInt(process.env.MYSQL_PORT) || 3306,
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || '',
            multipleStatements: true
        });

        const sqlFilePath = path.join(__dirname, 'database', 'data.db');
        const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

        // Drop the database if it exists to start fresh
        console.log("Executing SQL...");
        await connection.query('DROP DATABASE IF EXISTS supcrud_by_crudzaso;');
        await connection.query(sqlContent);

        console.log("Database initialized successfully!");
        await connection.end();
        process.exit(0);
    } catch (e) {
        console.error("Database import failed:", e);
        process.exit(1);
    }
}

importDb();
