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
            viewTable("employee");
        } 
        else if (answer.userChoice === "View all roles") {
            viewTable("role");
        }
        else if (answer.userChoice === "View all departments") {
            viewTable("department");
        } else {
            console.log("Shutting down...");
            connection.end();
        }
    });
}

function viewTable(value) {
    console.log("Gathering all employee data...\n");
    connection.query(`SELECT * FROM ${value}`, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}
