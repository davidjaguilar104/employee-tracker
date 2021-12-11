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
          viewDepartments();
          break;

        case "Add an Employee":
          viewDepartments();
          break;

        case "Update an Employee Role":
          viewDepartments();
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

promptUserChoices();
