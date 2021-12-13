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
        type: "input",
        name: "roleDepartmentId",
        message: "What Department does the Role belong to?",
      },
    ])
    .then((answer) => {
      console.log(answer.roleName); // answer object has the roleName property where user input is stored
      if (answer.roleDepartmentId === "Sales") {
        answer.roleDepartmentId = 1;
      } else if (answer.roleDepartmentId === "Engineering") {
        answer.roleDepartmentId = 2;
      } else if (answer.roleDepartmentId === "Finance") {
        answer.roleDepartmentId = 3;
      } else if (answer.roleDepartmentId === "Legal") {
        answer.roleDepartmentId = 4;
      } else if (answer.roleDepartmentId === "IT") {
        answer.roleDepartmentId = 5;
      }
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
        type: "input",
        name: "employeeRole",
        message: "What Role does the Employee take?",
      },
      {
        type: "input",
        name: "employeeManager",
        message: "Who is the Manager of this Employee?",
      },
    ])
    .then((answer) => {
      console.log(answer.employeeFirstName); // answer object has the employeeFirstName property where user input is stored
      if (answer.employeeRole === "Sales Lead") {
        answer.employeeRole = 1;
      } else if (answer.employeeRole === "Salesperson") {
        answer.employeeRole = 2;
      } else if (answer.employeeRole === "Lead Engineer") {
        answer.employeeRole = 3;
      } else if (answer.employeeRole === "Software Engineer") {
        answer.employeeRole = 4;
      } else if (answer.employeeRole === "Account Manager") {
        answer.employeeRole = 5;
      } if (answer.employeeRole === "Accountant") {
        answer.employeeRole = 6;
      } else if (answer.employeeRole === "Legal Team Lead") {
        answer.employeeRole = 7;
      } else if (answer.employeeRole === "Lawyer") {
        answer.employeeRole = 8;
      } else if (answer.employeeRole === "Help Desk") {
        answer.employeeRole = 9;
      } 

      if (answer.employeeManager === "John Doe") {
        answer.employeeManager = 1;
      } else if (answer.employeeManager === "Mike Chan") {
        answer.employeeManager = 2;
      } else if (answer.employeeManager === "Ashley Rodriguez") {
        answer.employeeManager = 3;
      } else if (answer.employeeManager === "Kevin Tupik") {
        answer.employeeManager = 4;
      } else if (answer.employeeManager === "Kunal Singh") {
        answer.employeeManager = 5;
      } else if (answer.employeeManager === "Malia Brown") {
        answer.employeeManager = 6;
      } else if (answer.employeeManager === "Sarah Lourd") {
        answer.employeeManager = 7;
      } else if (answer.employeeManager === "Tom Allen") {
        answer.employeeManager = 8;
      }
      
      
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

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeUpFirstName",
        message:
          "What is the First Name of the Employee you would like to Update?",
      },
      {
        type: "input",
        name: "employeeUpLastName",
        message:
          "What is the Last Name of the Employee you would like to Update?",
      },
      {
        type: "input",
        name: "employeeUpRole",
        message: "What is the new Role for this Employee?",
      },
    ])
    .then((answer) => {
      if (answer.employeeUpRole === "Sales Lead") {
        answer.employeeUpRole = 1;
      } else if (answer.employeeUpRole === "Salesperson") {
        answer.employeeUpRole = 2;
      } else if (answer.employeeUpRole === "Lead Engineer") {
        answer.employeeUpRole = 3;
      } else if (answer.employeeUpRole === "Software Engineer") {
        answer.employeeUpRole = 4;
      } else if (answer.employeeUpRole === "Account Manager") {
        answer.employeeUpRole = 5;
      } if (answer.employeeUpRole === "Accountant") {
        answer.employeeUpRole = 6;
      } else if (answer.employeeUpRole === "Legal Team Lead") {
        answer.employeeUpRole = 7;
      } else if (answer.employeeUpRole === "Lawyer") {
        answer.employeeUpRole = 8;
      } else if (answer.employeeUpRole === "Help Desk") {
        answer.employeeUpRole = 9;
      } 

      const sql = `UPDATE employees SET role_id = ${answer.employeeUpRole} 
    WHERE first_name = '${answer.employeeUpFirstName}' AND last_name = '${answer.employeeUpLastName}'`;

      db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUserChoices();
      });
    });
}

promptUserChoices();
