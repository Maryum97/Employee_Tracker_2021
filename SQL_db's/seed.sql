USE employee_db;

INSERT INTO department (dep_name)
VALUES ('Management'),
('Operation'),
('Maintenance'),
('Assistance'),
('Supervision');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 3000, 1),
('Engineer', 2500, 2),
('Technician', 2000, 3),
('Marketer', 3000, 4),
('Supervisor', 3000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Maryum', 'Bokhari', 2, 1);