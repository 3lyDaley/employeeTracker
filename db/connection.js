const mysql = require('mysql2');

const employee_db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  password: '?2rKeKTJR?',
  database: 'employee_db'
});

module.exports = employee_db;