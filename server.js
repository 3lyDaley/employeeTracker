const express = require('express');
const db = require('./db/connection');
// const apiRoutes = require('./routes/apiRoutes');
const fs = require('fs');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  employeePrompt();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

const employeePrompt = () => {
  inquirer.prompt ({
    type: 'list',
    name: 'menu',
    message: 'Choose one to continue:',
    choices: [
      "View Departments",
      "View Roles",
      "View Employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update Role",
      "Exit"
    ]
  })
}

