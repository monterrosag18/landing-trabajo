const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "supcrud_by_crudzaso"
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting:", err);
        process.exit(1);
    }
    const sql = `
        ALTER TABLE users 
        ADD COLUMN full_name VARCHAR(150) DEFAULT 'Usuario Nuevo',
        ADD COLUMN oauth_provider VARCHAR(50) DEFAULT NULL,
        ADD COLUMN is_global_owner INT NOT NULL DEFAULT 0;
    `;
    connection.query(sql, (err, result) => {
        if (err) {
            console.error("Error altering table:", err.sqlMessage);
        } else {
            console.log("Table successfully altered!");
        }
        process.exit(0);
    });
});
