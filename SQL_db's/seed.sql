USE employee_db;

INSERT INTO department (dep_name)
VALUES ('Maintenance');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', '100', '5');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Maryum', 'Bokhari', '3', '10');