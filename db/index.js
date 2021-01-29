// Requiring all necessary npm packages
const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const departments = [];
const roles = [];
const employeesFirst = [];
const employeesLast = [];

// Setting up connection to sql database
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

// Function that starts the inquirer application
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

// Queries to get arrays for each table to be used in later functions
connection.query("SELECT * FROM department ORDER BY id", function (err, result) {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
        departments.push(result[i].name);
    }
});
connection.query("SELECT * FROM role ORDER BY id", function (err, result) {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
        roles.push(result[i].title);
    }
});
connection.query("SELECT * FROM employee ORDER BY id", function (err, result) {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
        employeesFirst.push(result[i].first_name);
        employeesLast.push(result[i].last_name);
    }
});

// Function that prompts the user to make another selection or quit the application
function another() {
    inquirer.prompt([
        {
            name: "another",
            type: "confirm",
            message: "Would you like to go back to the main menu?"
        }
    ]).then(function (answer) {
        if (answer.another === true) {
            start();
        } else {
            connection.end();
        }
    });
}



// Function that views a certain table based on the user input
function viewTable(value) {
    console.log("Gathering all employee data...\n");
    connection.query(`SELECT * FROM ${value}`, function (err, res) {
        if (err) throw err;
        console.table(res);
        another();
    });
}

// Function that adds a new row to the department table
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
                another();
            }
        );
    });
}

// Function that adds a new row to the role table
function addRole() {
    console.log("Please enter the new role info...");
    inquirer.prompt([
        {
            name: "department",
            type: "list",
            message: "What department is this new role in?",
            choices: departments
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
        let newId = (departments.indexOf(answer.department)) + 1
        console.log(newId);
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.roleTitle,
                salary: answer.roleSalary,
                department_id: newId
            },
            function (err, res) {
                if (err) throw err;
                console.log(`${answer.roleTitle} role added!`);
                another();
            }
        );
    });
}

// Function that adds a new row to the employee table
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
        {
            name: "role",
            type: "list",
            message: "What role does this new employee have?",
            choices: roles
        },
    ]).then(function (answer) {
        let newRoleId = (roles.indexOf(answer.role)) + 1
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.employeeFirstName,
                last_name: answer.employeeLastName,
                role_id: newRoleId
            },
            function (err, res) {
                if (err) throw err;
                console.log(`${answer.employeeFirstName} ${answer.employeeLastName} has been added as a ${answer.role}!`);
                another();
            }
        );
    });
}

// Function that updates the role of an existing employee
function updateRole() {
    inquirer.prompt([
        {
            name: "employeeF",
            type: "list",
            message: "What is the first name of the employee you would like to update?",
            choices: employeesFirst
        },
        {
            name: "employeeL",
            type: "list",
            message: "What is the last name of the employee you would like to update?",
            choices: employeesLast
        },
        {
            name: "role",
            type: "list",
            message: "What is the new role for this employee?",
            choices: roles
        }
    ]).then(function (answer) {
        let newRoleId2 = (roles.indexOf(answer.role)) + 1
        connection.query(
            `UPDATE employee SET role_id='${newRoleId2}' WHERE first_name='${answer.employeeF}' AND last_name='${answer.employeeL}'`,
            function (err, res) {
                if (err) throw err;
                console.log(`${answer.employeeF} ${answer.employeeL} has been added as a ${answer.role}!`);
                another();
            }
        );
    });
}