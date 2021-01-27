const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId} \n`);
    start();
});

function start() {
    inquirer.prompt([
        {
            name: "userChoice",
            type: "list",
            message: "What would you like to do?",
            choices: ["View all employees", "View all roles", "View all departments", "EXIT"]
        }
    ]).then(function (answer) {
        if (answer.userChoice === "View all employees") {
            viewEmployees();
        } 
        else if (answer.userChoice === "View all roles") {
            viewRoles();
        }
        else if (answer.userChoice === "View all departments") {
            viewDepartments();
        } else {
            console.log("Shutting down...");
            connection.end();
        }
    });
}

