const db = require("./db/connection.js");
const inquirer = require("inquirer");

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
          viewDepartments();
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
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) throw err;

    console.table(rows);
    promptUserChoices();
  });
}

promptUserChoices();
