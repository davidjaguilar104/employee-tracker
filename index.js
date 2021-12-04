const db = require('./db/connection.js');
const inquirer = require("inquirer");

const promptUserChoices = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "initialOptions",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
      ],
    },
  ]);
};

promptUserChoices();