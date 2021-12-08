const db = require("./db/connection.js");
const inquirer = require("inquirer");

function promptUserChoices() {
  inquirer.prompt([
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
  ]).then(function({ task }) {
    switch (task) {
      case "View All Departments":
      viewDepartments();
      break;
    }
  })
};

promptUserChoices();
