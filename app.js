// Dependancies
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Connect to the correct database
const connection = mysql2.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'employee_db',
});

// Connection response
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id: ${connection.threadId}`);
    init();
});

// Call function to initialise server request
function init() {
    userPrompt();
}

// Inquirer here to prompt options to user
const userPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Please select what you would like to do:",
            name: "choice",
            choices: [
                "View All Employees",
                "View All Roles",
                "View All Departments",
                "View All Employees By Roles",
                "View all Employees By Departments",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Update Employee Role"
            ]
        }
    ]).then((value) => {
        switch (value.choice) {
            // Call a function for each individual choice in the prompt
            case "View All Employees":
                viewAllEmployees();
                break;

            case "View All Roles":
                viewAllRoles();
                break;

            case "View All Departments":
                viewAllDepartments();
                break;

            case "View All Employees By Roles":
                viewByRole();
                break;

            case "View All Employees By Departments":
                viewByDepartment();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Update Employee Role":
                updateRole();
                break;
        }
    })
}

// Declare all functions here, from the above switch statement

// VIEW ALL EMPLOYEES
const viewAllEmployees = () => {
    connection.query(
        "SELECT employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, role.department_id, department.dep_name FROM employee INNER JOIN role ON employee.id = role.id INNER JOIN department ON employee.id = department.dep_name;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            userPrompt();
        });
}

// VIEW ALL ROLES
const viewAllRoles = () => {
    connection.query(
        "SELECT * FROM role",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            userPrompt();
        });
}

// VIEW ALL DEPARTMENTS
const viewAllDepartments = () => {
    connection.query(
        "SELECT * FROM department",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            userPrompt();
        });
}

// VIEW ALL EMPLOYEES BY ROLE
const viewByRole = () => {
    connection.query(
        "SELECT employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, role.department_id FROM employee INNER JOIN role ON employee.id = role.id;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            userPrompt();
        });
}

// VIEW ALL EMPLOYEES BY DEPARTMENT
const viewByDepartment = () => {
    connection.query(
        "SELECT employee.first_name, employee.last_name, department.dep_name FROM employee INNER JOIN department ON employee.id = department.dep_name;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            userPrompt();
        });
}

// ADD EMPLOYEE
const addEmployee = () => {

}

// ADD ROLE
const addRole = () => {

}

// ADD DEPARTMENT
const addDepartment = () => {

}

// UPDATE EMPLOYEE ROLE
const updateRole = () => {

}