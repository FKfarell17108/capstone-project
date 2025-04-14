const mysql = require('mysql')
require('dotenv').config()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_trashtocash"
})

db.connect(err => {
    if (err) {
        console.log("Database connection failed:", err)
    } else {
        console.log("Database connected!")
    }
});

module.exports = db