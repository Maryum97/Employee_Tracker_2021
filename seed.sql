USE employee_db;

INSERT INTO department (dep_name)
VALUES ('House-Keeping'),
('Operation'),
('Management'),
('Maintenance'),
('Control'),
('Supervision');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineer', 3000),
('Manager', 2000),
(),
(),
(),
(),
();


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Maryum', 'Bokhari', '3', '10');