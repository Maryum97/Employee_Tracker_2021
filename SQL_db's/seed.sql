USE employee_db;

INSERT INTO department (dep_name)
VALUES ('Management'),
('Operation'),
('Maintenance'),
('Sales'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 3000, 1),
('Engineer', 2500, 2),
('Technician', 2000, 3),
('Marketer', 3000, 4),
('Lawyer', 3000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Maryum', 'Bokhari', 1, null);

INSERT INTO manager (id, first_name, last_name)
VALUES (1, 'Zahid', 'Bokhari'),
(2, 'Betty', 'Smith'),
(3, 'Martha', 'Mesa');