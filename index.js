const db = require("./db/connection.js");
const inquirer = require("inquirer");
require("console.table");

function promptUserChoices() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Exit",
        ],
      },
    ])
    .then(({ task }) => {
      switch (task) {
        case "View All Departments":
          viewDepartments();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add a Department":
          addDepartment();
          break;

        case "Add a Role":
          addRole();
          break;

        case "Add an Employee":
          addEmployee();
          break;

        case "Update an Employee Role":
          updateEmployee();
          break;
      }
    });
}

function viewDepartments() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) throw err;

    console.table(rows);
    promptUserChoices();
  });
}

function viewRoles() {
  const sql = `SELECT roles.*, departments.name AS department 
  FROM roles 
  LEFT JOIN departments
  ON roles.department_id = departments.id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;

    console.table(rows);
    promptUserChoices();
  });
}

function viewEmployees() {
  const sql = `SELECT employees.*, CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager, roles.title AS job_title, roles.salary AS salary, departments.name AS department
  FROM employees
  LEFT JOIN roles
  ON employees.role_id = roles.id
  LEFT JOIN departments
  ON departments.id = roles.department_id
  LEFT JOIN employees manager ON manager.id = employees.manager_id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;

    console.table(rows);
    promptUserChoices();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the Department you would like to add?",
      },
    ])
    .then((answer) => {
      console.log(answer.department); // answer object has the department property where user input is stored
      const sql = `INSERT INTO departments (name) VALUES ('${answer.department}')`;
      db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUserChoices();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the name of the Role you would like to add?",
      },
      {
        type: "list",
        name: "roleSalary",
        message: "What is the Salary of the Role?",
        choices: [100000, 125000, 150000, 80000],
      },
      {
        type: "list",
        name: "roleDepartmentId",
        message: "What Department does the Role belong to?",
        choices: [1, 2, 3, 4, 5],
      },
    ])
    .then((answer) => {
      console.log(answer.roleName); // answer object has the roleName property where user input is stored
      const sql = `INSERT INTO roles (title, salary, department_id) 
      VALUES 
      ('${answer.roleName}', ${answer.roleSalary}, ${answer.roleDepartmentId})`;
      db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUserChoices();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeFirstName",
        message:
          "What is the First Name of the Employee you would like to add?",
      },
      {
        type: "input",
        name: "employeeLastName",
        message: "What is the Last Name of the Employee you would like to add?",
      },
      {
        type: "list",
        name: "employeeRole",
        message: "What Role does the Employee take?",
        choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      {
        type: "list",
        name: "employeeManager",
        message: "Who is the Manager of this Employee?",
        choices: [1, 2, 3, 4, 5, 6, 7, 8],
      },
    ])
    .then((answer) => {
      console.log(answer.employeeFirstName); // answer object has the employeeFirstName property where user input is stored
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
      VALUES 
      ('${answer.employeeFirstName}', '${answer.employeeLastName}', ${answer.employeeRole}, ${answer.employeeManager})`;
      db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUserChoices();
      });
    });
}

promptUserChoices();
