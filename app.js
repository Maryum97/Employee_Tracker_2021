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
                "View All Managers",
                "View All Employees By Role",
                "View all Employees By Department",
                "View all Employees By Manager",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Add Manager",
                "Update Employee Role",
                "Update Employee Manager",
                "Delete Employee",
                "Delete Role",
                "Delete Department"
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

            case "View All Managers":
                viewAllManagers();
                break;

            case "View All Employees By Role":
                viewByRole();
                break;

            case "View All Employees By Department":
                viewByDepartment();
                break;

            case "View all Employees By Manager":
                viewByManager();
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

            case "Add Manager":
                addManager();
                break;

            case "Update Employee Role":
                updateRole();
                break;

            case "Update Employee Manager":
                updateManager();
                break;

            case "Delete Employee":
                deleteEmployee();
                break;

            case "Delete Role":
                deleteRole();
                break;

            case "Delete Department":
                deleteDepartment();
                break;
        }
    })
}

// Declare all functions here, from the above switch statement

// VIEW ALL EMPLOYEES
const viewAllEmployees = () => {
    connection.query(
        "SELECT employee.first_name, employee.last_name FROM employee",
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

// VIEW ALL MANAGERS
const viewAllManagers = () => {
    connection.query(
        "SELECT * FROM manager",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            userPrompt();
        }
    )
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
        "SELECT employee.first_name, employee.last_name, department.dep_name FROM employee LEFT JOIN department ON employee.id = department.dep_name;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            userPrompt();
        });
}

// VIEW ALL EMPLOYEES BY MANAGER
const viewByManager = () => {
    connection.query(
        "SELECT employee.first_name, employee.last_name, employee.manager_id, manager.first_name, manager.last_name FROM employee INNER JOIN manager ON employee.manager_id = manager.id;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            userPrompt();
        }
    )
}

// ADD EMPLOYEE
// First declare the function that produces an array of choices of new and existing roles for the new employee
rolesArray = [];
const chooseRole = () => {
    connection.query(
        "SELECT * FROM role",
        (err, res) => {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                rolesArray.push(res[i].title);
            }
        });
    return rolesArray;
}
// Then declare the function that produces an array of choices of new and existing managers for the new employee
managerArray = [];
const chooseManager = () => {
    connection.query(
        "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
        (err, res) => {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                managerArray.push(res[i].manager_id);
            }
        });
    return managerArray;
}
// Function to add employee here
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the employee's first name:",
            name: "firstName"
        },
        {
            type: "input",
            message: "Please enter the employee's last name:",
            name: "lastName"
        },
        {
            type: "list",
            message: "Please select the employee's role:",
            name: "role",
            choices: chooseRole()
        },
        {
            type: "input",
            message: "Please specify the ID of the employee's manager:",
            name: "manager"
        }
    ]).then((value) => {
        var roleId = chooseRole().indexOf(value.role) + 1;
        var managerId = chooseManager().indexOf(value.manager) + 1;
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: value.firstName,
                last_name: value.lastName,
                manager_id: managerId,
                role_id: roleId
            },
            (err) => {
                if (err) throw err;
                console.log("Your new employee has been added!");
                console.table(res);
                userPrompt();
            })

    })
}

// ADD ROLE
const addRole = () => {
    connection.query(
        "SELECT * FROM role",
        (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please specify the title of the role:",
                    name: "title"
                },
                {
                    type: "input",
                    message: "Please specify the salaray of the role:",
                    name: "salary"
                }
            ]).then((res) => {
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: res.title,
                        salary: res.salary
                    },
                    (err) => {
                        if (err) throw err;
                        console.table(res);
                        userPrompt();
                    }
                )
            })
        })
}

// ADD DEPARTMENT
const addDepartment = () => {
    connection.query(
        "SELECT * FROM department",
        (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please specify the name of the department you'd like to add:",
                    name: "depName"
                }
            ]).then((res) => {
                connection.query(
                    "INSERT INTO department SET ?",
                    {
                        dep_name: res.depName
                    },
                    (err) => {
                        if (err) throw err;
                        console.table(res);
                        userPrompt();
                    }
                )
            })
        })
}

// ADD MANAGER
const addManager = () => {
    connection.query(
        "SELECT * FROM manager;",
        (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please specify the manager's first name:",
                    name: "firstName"
                },
                {
                    type: "input",
                    message: "Please specify the manager's last name:",
                    name: "lastName"
                }
            ]).then((value) => {
                connection.query(
                    "INSERT INTO manager SET ?",
                    {
                        first_name: value.firstName,
                        last_name: value.lastName
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log("Your manager has been added!");
                        console.table(res);
                        userPrompt();
                    }
                )
            })
        }
    )
}

// UPDATE EMPLOYEE ROLE
const updateRole = () => {
    connection.query(
        "SELECT * FROM employee;",
        (err, res) => {
            if (err) throw err;
            console.log(res);
            inquirer.prompt([
                {
                    type: "rawlist",
                    message: "Please specify the employee's first name:",
                    name: "firstName",
                    choices: () => {
                        var firstName = [];
                        for (var i = 0; i < res.length; i++) {
                            firstName.push(res[i].first_name);
                        }
                        return firstName;
                    }
                },
                {
                    type: "rawlist",
                    message: "Please specify the employee's last name:",
                    name: "lastName",
                    choices: () => {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].last_name);
                        }
                        return lastName;
                    }
                },
                {
                    type: "rawlist",
                    message: "Please specify the employee's new role:",
                    name: "role",
                    choices: chooseRole()
                }
            ]).then((value) => {
                var roleId = chooseRole().indexOf(value.role) + 1;
                connection.query(`UPDATE employee SET role_id = ${roleId} WHERE first_name = ? AND last_name = ?`,
                    [value.firstName, value.lastName],
                    (err, res) => {
                        if (err) throw err;
                        console.log("Your employee's role has been updated!");
                        console.table(res);
                        userPrompt();
                    }
                )
            })
        })
}

// UPDATE EMPLOYEE MANAGER
// First declare the function that returns an array of managers for the employee to be assigned to
const selectManager = () => {
    var managerArr = [];
    connection.query(
        "SELECT * FROM manager;",
        (err, res) => {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                managerArr.push(res[i].id);
            }
        });
    return managerArr;
}
// Function to update manager here
const updateManager = () => {
    connection.query(
        "SELECT * FROM employee;",
        (err, res) => {
            if (err) throw err;
            console.log(res);
            inquirer.prompt([
                {
                    type: "rawlist",
                    message: "Please specify the employee's first name:",
                    name: "firstName",
                    choices: () => {
                        var firstName = [];
                        for (var i = 0; i < res.length; i++) {
                            firstName.push(res[i].first_name);
                        }
                        return firstName;
                    }
                },
                {
                    type: "rawlist",
                    message: "Please specify the employee's last name:",
                    name: "lastName",
                    choices: () => {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].last_name);
                        }
                        return lastName;
                    }
                },
                {
                    type: "rawlist",
                    message: "Please specify the ID of the employee's new manager:",
                    name: "manager",
                    choices: selectManager()
                }
            ]).then((value) => {
                var managerId = selectManager().indexOf(value.manager) + 1;
                connection.query(`UPDATE employee SET manager_id = ${managerId} WHERE first_name = ? AND last_name = ?`,
                    [value.firstName, value.lastName],
                    (err, res) => {
                        if (err) throw err;
                        console.log("Your employee's manager has been updated!");
                        console.table(res);
                        userPrompt();
                    }
                )
            })
        })
}

// DELETE EMPLOYEE
const deleteEmployee = () => {
    connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name FROM employee;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please choose the ID of the employee that you would like to delete:",
                    name: "employee"
                },
            ]).then((value) => {
                console.log(value.employee);
                connection.query(
                    `DELETE FROM employee WHERE id = ?;`,
                    [value.employee],
                    (err, res) => {
                        if (err) throw err;
                        console.log("Your employee has been deleted!");
                        console.table(res);
                        userPrompt();
                    })
            })
        })
}

// DELETE ROLE
const deleteRole = () => {
    connection.query(
        "SELECT role.id, role.title, role.salary, role.department_id FROM role;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please choose the ID of the role that you would like to delete:",
                    name: "role"
                },
            ]).then((value) => {
                console.log(value.role);
                connection.query(
                    `DELETE FROM employee WHERE id = ?;`,
                    [value.role],
                    (err, res) => {
                        if (err) throw err;
                        console.log("This role has been deleted!");
                        console.table(res);
                        userPrompt();
                    })
            })
        })
}

// DELETE DEPARTMENT
const deleteDepartment = () => {
    connection.query(
        "SELECT department.id, department.dep_name FROM department;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please choose the ID of the department that you would like to delete:",
                    name: "department"
                },
            ]).then((value) => {
                console.log(value.department);
                connection.query(
                    `DELETE FROM department WHERE id = ?;`,
                    [value.department],
                    (err, res) => {
                        if (err) throw err;
                        console.log("This department has been deleted!");
                        console.table(res);
                        userPrompt();
                    })
            })
        })
}