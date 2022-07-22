const express = require('express');
const db = require('./db/connection');

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

function employeePrompt() {
  inquirer.prompt ([{
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
  }])
  .then(userSelect => {
    switch (userSelect.menu) {
      case 'View Departments':
        viewDepartments();
        break;
      case 'View Roles':
        viewRoles();
        break;
      case 'View Employees':
        viewEmployees();
        break;
      default: process.exit();
    }
  })
}



viewDepartments = () => {
  db.query(
    'SELECT * FROM department;',
    (err, results) => {
      console.table(results);
      inquirer.prompt([{
        type: 'list',
        name: 'menu',
        message: 'Would you like to return to main menu or exit?',
        choices: [
          "Main Menu",
          "Exit"
        ]
      }])
        .then(userSelect => {
          switch (userSelect.menu) {
            case 'Main Menu':
              employeePrompt();
              break;
            case 'Exit':
              console.log("Goodbye!")
              process.exit();
            }
          })
    }
  );
}

viewRoles = () => {
  db.query(
    'SELECT * FROM roles;',
    (err, results) => {
      console.table(results);
      inquirer.prompt([{
        type: 'list',
        name: 'menu',
        message: 'Would you like to return to main menu or exit?',
        choices: [
          "Main Menu",
          "Exit"
        ]
      }])
        .then(userSelect => {
          switch (userSelect.menu) {
            case 'Main Menu':
              employeePrompt();
              break;
            case 'Exit':
              console.log("Goodbye!")
              process.exit();
          }
        })
    }
  )
};

viewEmployees = () => {
  db.query(
    'SELECT * FROM employees;',
    (err, results) => {
      console.table(results);
      inquirer.prompt([{
        type: 'list',
        name: 'menu',
        message: 'Would you like to return to main menu or exit?',
        choices: [
          "Main Menu",
          "Exit"
        ]
      }])
        .then(userSelect => {
          switch (userSelect.menu) {
            case 'Main Menu':
              employeePrompt();
              break;
            case 'Exit':
              console.log("Goodbye!")
              process.exit();
          }
        })
    }  
  )
};