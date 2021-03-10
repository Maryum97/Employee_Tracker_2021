// Dependancies
const mysql2 = require('mysql2');
const inquirer = require('inquirer');

// Connect to the correct database
const connection = mysql2.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'employee_db',
});

// Call function to initialise server request
function init() {
    userPrompt();
}

// Inquirer here to prompt questions/options
const userPrompt = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Please specify the department name:",
            name: "department"
        }
    ]).then(({ department }) => {
        connection.query(
            {
                name: `${department}`
            },
            (err, res) => {
                if (err) throw err;
                console.log(`Added name of department for ${res.affectedRows}!\n\n`);
                init();
            }
        )
    })
}

// Connection response
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id: ${connection.threadId}`);
    init();
});