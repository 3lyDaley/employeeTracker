const mysql = require('mysql2');

const employee_db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: process.env.MYSQL_PASSWORD,
  database: 'employee_db'
});

module.exports = employee_db;