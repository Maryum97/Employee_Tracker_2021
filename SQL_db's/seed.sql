USE employee_db;

INSERT INTO department (dep_name)
VALUES ('Finance'),
('Operation'),
('Maintenance'),
('Sales'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 3000, 1),
('Engineer', 3000, 2),
('Technician', 2000, 3),
('Marketer', 3000, 4),
('Lawyer', 3000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Maryum', 'Bokhari', 1, null),
(2, 'Sarah', 'Amir', 1, null),
(3, 'Amjad', 'Shah', 4, 4),
(4, 'Thomas', 'Basset', 3, null),
(5, 'Charlotte', 'Fischer', 2, 1);
