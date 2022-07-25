# MySQL Employee Tracker

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

----------------------------------------------------------
 Command-line created mySQL employee database. 
 
 ## Contents
 
 - [Description](#description)
    - [User Story](#user-story)
    - [Acceptance Criteria](#acceptance-criteria)
 - [Dependencies](#dependencies)
 - [Installation Instructions](#installing)
 - [Execution](#executing-program)
 - [Inquirer Demo](#inquirer-demo)
 - [Screenshots](#command-line-visuals)
 - [Authors](#authors)
 - [License](#license)

## Description

This employee tracker uses mySQL and Inquirer to complete a comprehensive list of employees, management, and various roles and departments within a company. The tables are structured such that departments, roles, and employees each have their own table, but are connected through each employee's role ID, which corresponds to respective department IDs. Every component is entered through an Inquirer prompt by the user. The user is able to Add and Delete departments, roles, and employees, as well as updating employee roles or managers. THere is also the option to view each table, (Departments, Roles, and Employees) along with a manager table that displays the manager and their team, or a department table which displays all employees in each department. Users may also store data in a seed file and source that into the employee database. 

### User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

### Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, 
view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, 
job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, 
and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```
### Dependencies
```
"console.table": "^0.10.0",
"dotenv": "^16.0.1",
"express": "^4.18.1",
"express-router": "^0.0.1",
"fs": "^0.0.1-security",
"inquirer": "^8.2.4",
"mysql2": "^2.3.3"
```
### Installing

* Fork this repo and clone to your machine
* `npm i` to install all dependencies

### Executing program

* Open terminal in root
* enter `npm i` in command line for dependencies
* `node server.js` to display options list

## Demos


https://user-images.githubusercontent.com/100460009/180697811-4e757f09-bb09-4bdc-8827-01f9c8b5804e.mp4



https://user-images.githubusercontent.com/100460009/180697820-085385f9-f803-453f-ae9a-3231fdad2953.mp4


_______________________________________________________________

## Authors

[Ely Daley](https://github.com/3lyDaley)

## Command Line Visuals

![openingPrompt](https://user-images.githubusercontent.com/100460009/180697835-5e2638ae-c76f-44cb-94bd-262eddba7b86.png)
![views](https://user-images.githubusercontent.com/100460009/180697845-b56ae493-f0b1-46a5-ab8c-4f27a7f9e1b6.png)
![addEmployee](https://user-images.githubusercontent.com/100460009/180697853-0b721ad1-29af-4bf1-8b78-0c8cb2a770d9.png)

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details




