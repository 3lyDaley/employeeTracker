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
      case 'Add a department':
        addDept();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
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
      if (err) throw err;
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

addDept = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department_name',
      message: "What is the name of the new Department?",
      validate: department_nameInput => {
        if(department_nameInput) {
          console.log(department_nameInput);
          return true;
        } else {
          console.log("Cannot add unnamed department to database.")
          return false;
        }
      }
    }
  ]).then(deptData => {
    db.query(
      "INSERT INTO department SET ?", {
      department_name: deptData.department_name
    }, 
    (err) => {
      if (err) throw err;
        console.log("=======================================")
        console.log("==    *    Department Added!    *    ==")
        console.log("=======================================")
      viewDepartments();
      })
    })
}

addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'role_title',
      message: "What is this role's title?",
      validate: role_titleInput => {
        if (role_titleInput) {
          return true;
        } else {
          console.log("Please enter a role.")
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is this role's salary?",
      validate: salaryInput => {
        if (salaryInput) {
          return true;
        } else {
          console.log("Please enter the salary.")
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'department_id',
      message: "What is the ID of this role's department?",
      validate: department_idInput => {
        if (department_idInput) {
          return true;
        } else {
          console.log("Please enter the Department ID.")
          return false;
        }
      }
    }
  ]).then(roleData => {
    db.query(
      "INSERT INTO roles SET ?", {
      role_title: roleData.role_title,
      salary: roleData.salary,
      department_id: roleData.department_id
    }, (err) => {
      if (err) throw err;
      console.log("=================================")
      console.log("==    *    Role Added!    *    ==")
      console.log("=================================")
      viewRoles();
    })
  })
}

addEmployee = (roles) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "What is the employee's first name?",
      validate: first_nameInput => {
        if (first_nameInput) {
          return true;
        } else {
          console.log("Please enter their first name.")
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'last_name',
      message: "What is their last name?",
      validate: last_nameInput => {
        if (last_nameInput) {
          return true;
        } else {
          console.log("Please enter the last name.")
          return false;
        }
      }
    }
  ]).then(employeeData => {
    
    db.query(`SELECT role.id, role.role_title FROM roles`, (results) => {
      const employeeArr = [employeeData.first_name, employeeData.last_name];
      const roles = results.map(({id, role_title}) => ({name: role_title, value: id}));
      inquirer.prompt([
        {
          type: 'list',
          name: 'roleTitle',
          message: "What is this employee's role?",
          choices: roles
        }
      ]).then(roleTitleChoice => {
        let role = roleTitleChoice.roleTitle;
        employeeArr.push(role)
      })
    })
  }).then((employeeArr) => {
    db.promise().query(`INSERT INTO employees ( first_name, last_name, role_id) VALUES (?, ?, ?)`, employeeArr, (err, results) => {
      if (err) throw err;
      console.log(results)
    })  
  })
}  


        // db.query(
        //   "INSERT INTO roles SET ?", {
        //   first_name: employeeData.first_name,
        //   last_name: employeeData.last_name,
        //   salary: employeeData.salary,
        //   department_id: rData.department_id
        // }, (err) => {
        //   if (err) throw err;
        //   console.log("=================================")
        //   console.log("==    *    Role Added!    *    ==")
        //   console.log("=================================")
        //   viewRoles();
        // })