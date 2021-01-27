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
    connection.end();
});