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
      "Update Employee Role",
      "Update Employee Manager",
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
      case 'Update Employee Role':
        updateEmployeeRole()
        break;
      case 'Update Employee Manager':
        updateEmployeeManager();
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
    }]).then(roleData => {
  
      // ADD ALREADY-COLLECTED DATA TO ARRAY
      let role_title = roleData.role_title;
      let salary = roleData.salary;
      
      // FIND ROLES FOR EMPLOYEE ROLE CHOICES
      db.query(`SELECT * FROM department`, (err, results) => {
        const depts = results.map(({ department_name, id }) => ({ name: department_name, value: id }));

      inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: "What department does this role belong to?",
        choices: depts

      }]).then(roleData => {
         
        db.query(
          "INSERT INTO roles SET ?", {
          role_title: role_title,
          salary: salary,
          department_id: roleData.department
        }, (err) => {
          if (err) throw err;
          console.log("=================================")
          console.log("==    *    Role Added!    *    ==")
          console.log("=================================")
          viewRoles();
        })
      })
    })
  })  
}

addEmployee = () => {
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
    // CREATE EMPTY EMPLOYEE ARRAY TO ADD NAME, ROLE, AND MANAGER TO
    let employee = [];

    // ADD ALREADY-COLLECTED DATA TO ARRAY
    let first_name = employeeData.first_name;
    let last_name = employeeData.last_name;
    employee.push(first_name, last_name);

    // FIND ROLES FOR EMPLOYEE ROLE CHOICES
    db.query(`SELECT role_title, id FROM roles`, (err, results) => {
      const roles = results.map(({ role_title, id }) => ({ name: role_title, value: id}));

      inquirer.prompt([
        {
          type: 'list',
          name: 'role',
          message: 'What is the employee role?',
          choices: roles
        }
      ]).then(roleChoice => {
        // PUSH THE ROLE CHOICE'S ID TO EMPLOYEE'S ARRAY
        let role = roleChoice.role;
        employee.push(role);
// GET MANAGER INFO BY FINDING NULL MANAGER_IDS
    db.query(`SELECT id, CONCAT(first_name, ' ', last_name)AS name FROM employees WHERE manager_id IS NULL`, (err, results) => {
    
      const managers = results.map(({ name, id }) => ({ name: name, value: id }));
      
      inquirer.prompt([
        {
          type: 'list',
          name: 'manager',
          message: 'Who is the employee\'s manager?',
          choices: [...managers, "NULL"]
        }
      ]).then(managerChoice => {
        let manager = managerChoice.manager;
        employee.push(manager)

        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)`, employee, 
          (err) => {
            if (err) throw err;
            console.log("=====================================")
            console.log("==    *    Employee Added!    *    ==")
            console.log("=====================================")
          viewEmployees();
        })
      })
      })
    })
  })
})
};

updateEmployeeRole = () => {
  db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees`, (err, results) => {
    const employees = results.map(({name, id}) => ({ name: name, value: id}));

    inquirer.prompt([
      {
        type: 'list',
        name: 'updateEmp',
        message: 'Which employee would you like to update?',
        choices: employees
      }
    ]).then(employeeChoice => {
        let employee = employeeChoice.updateEmp

      db.query(`SELECT role_title, id FROM roles`, (err, results) => {
        const roles = results.map(({ role_title, id }) => ({ name: role_title, value: id }));

        inquirer.prompt([
          {
            type: 'list',
            name: 'role',
            message: 'What will be the employee\'s new role?',
            choices: roles
          }
        ]).then(roleChoice => {
          // PUSH THE ROLE CHOICE'S ID TO EMPLOYEE'S ARRAY
          let employeeRole = roleChoice.role;
          let employeeData = [employeeRole, employee]
          
          db.query(`UPDATE employees SET role_id = ? WHERE id = ?`, (employeeData), (err) => {
            if (err) throw err;
            console.log("=================================================")
            console.log("          Updated employee " + employee +" role to "+ employeeRole+ "!          ")
            console.log("=================================================")
            viewEmployees();
          })
        })
      })
    })
  })
};

updateEmployeeManager = () => {
  db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employees`, (err, results) => {
    const employees = results.map(({ name, id }) => ({ name: name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'updateEmp',
        message: 'Which employee would you like to update?',
        choices: employees
      }
    ]).then(employeeChoice => {
      let employee = employeeChoice.updateEmp

      db.query(`SELECT id, CONCAT(first_name, ' ', last_name)AS name FROM employees WHERE manager_id IS NULL`, (err, results) => {

        const managers = results.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
          {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: [...managers, "NULL"]
          }
        ]).then(managerChoice => {
          let manager = managerChoice.manager;
          let employeeData = [manager, employee]

          db.query(`UPDATE employees SET manager_id = ? WHERE id = ?`, (employeeData),
            (err) => {
              if (err) throw err;
              console.log("=============================================================")
              console.log("==    *    Employee " + employee + " new manager's ID is now " + manager + "    *    ==")
              console.log("=============================================================")
              viewEmployees();
          })
        })
      })
    })
  })
}

      

  