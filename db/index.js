const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");

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
    console.log(
        chalk.magenta(
            figlet.textSync("Employee Tracker", { horizonalLayout: "full" })
        )
    );
    start();
});

function start() {
    inquirer.prompt([
        {
            name: "userChoice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "Update employee roles",
                "Add new department",
                "Add new role",
                "Add new employee",
                "EXIT"
            ]
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
        }
        else if (answer.userChoice === "Update employee roles") {
            updateRole();
        }
        else if (answer.userChoice === "Add new department") {
            addDepartment();
        }
        else if (answer.userChoice === "Add new role") {
            addRole();
        }
        else if (answer.userChoice === "Add new employee") {
            addEmployee();
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

function departmentID (value) {
    connection.query(`SELECT id FROM department WHERE name='${value}'`,
    function (err, res) {
        if (err) throw err;
        let newvalue = JSON.stringify(res)
        let newervalue = newvalue[7]
        console.log(newervalue);
        return newervalue;
    });
}

function addDepartment() {
    console.log("Please enter the new department info...");
    inquirer.prompt([
        {
            name: "departName",
            type: "input",
            message: "What is the name of the new department?"
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.departName
            },
            function (err, res) {
                if (err) throw err;
                console.log(`${answer.departName} department added!`);
                inquirer.prompt([
                    {
                        name: "another",
                        type: "confirm",
                        message: "Would you like to make another department?"
                    }
                ]).then(function (answer) {
                    if (answer.another === true) {
                        addDepartment();
                    } else {
                        start();
                    }
                });
            }
        );
    });
}

function addRole() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;

        console.log("Please enter the new role info...");
        inquirer.prompt([
            {
                name: "department",
                type: "list",
                message: "What department is this new role in?",
                choices: function () {
                    let choicesArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choicesArray.push(res[i].name);
                    }
                    return choicesArray;
                }
            },
            {
                name: "roleTitle",
                type: "input",
                message: "What is the title of the new role?"
            },
            {
                name: "roleSalary",
                type: "number",
                message: "What is the salary of the new role?"
            },
        ]).then(function (answer) {
            console.log(answer.department);
            console.log(departmentID(answer.department));
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.roleTitle,
                    salary: answer.roleSalary,
                    department_id: departmentID(answer.department)
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(`${answer.roleTitle} role added!`);
                    inquirer.prompt([
                        {
                            name: "another",
                            type: "confirm",
                            message: "Would you like to make another role?"
                        }
                    ]).then(function (answer) {
                        if (answer.another === true) {
                            addRole();
                        } else {
                            start();
                        }
                    });
                }
            );
        });
    });
}

function addEmployee() {
    console.log("Please enter the new employee info...");
    inquirer.prompt([
        {
            name: "employeeFirstName",
            type: "input",
            message: "What is the first name of the new employee?"
        },
        {
            name: "employeeLastName",
            type: "input",
            message: "What is the last name of the new employee?"
        },
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.employeeFirstName,
                last_name: answer.employeeLastName
            },
            function (err, res) {
                if (err) throw err;
                console.log(`${answer.employeeFirstName} ${answer.employeeLastName} has been added!`);
                inquirer.prompt([
                    {
                        name: "another",
                        type: "confirm",
                        message: "Would you like to make another employee?"
                    }
                ]).then(function (answer) {
                    if (answer.another === true) {
                        addEmployee();
                    } else {
                        start();
                    }
                });
            }
        );
    });
}