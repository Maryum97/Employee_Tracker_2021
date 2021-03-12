DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- TABLES HERE --

-- Table 1 --
CREATE TABLE department (
id INTEGER (100) auto_increment NOT NULL,
dep_name VARCHAR (100) NOT NULL,
PRIMARY KEY (id)
);

-- Table 2 --
CREATE TABLE role (
id INTEGER (100) auto_increment NOT NULL,
title VARCHAR (100) NOT NULL,
salary DECIMAL (10, 2) NOT NULL,
department_id INTEGER (100) NOT NULL,
CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
PRIMARY KEY (id)
);

-- Table 3 --
CREATE TABLE employee (
id INTEGER (100) auto_increment NOT NULL,
first_name VARCHAR (100) NOT NULL,
last_name VARCHAR (100) NOT NULL,
role_id INTEGER (100) NOT NULL,
manager_id INTEGER (100),
PRIMARY KEY (id)
);

-- Table 4 --
CREATE TABLE manager (
id INTEGER (100) auto_increment NOT NULL,
first_name VARCHAR (100) NOT NULL,
last_name VARCHAR (100) NOT NULL,
PRIMARY KEY (id)
);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

SELECT * FROM manager;


-- JOIN STATEMENTS HERE --

-- JOIN 1 -- 
SELECT employee.id, employee.first_name, employee.last_name
-- , department.dep_name
FROM employee;
-- INNER JOIN role ON employee.role_id = role.id
-- LEFT JOIN department ON department.id = role.department_id;

-- JOIN 2 --
SELECT employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, role.department_id
FROM employee
INNER JOIN role ON employee.id = role.id;

-- JOIN 3 --
SELECT employee.first_name, employee.last_name, department.dep_name
FROM employee
LEFT JOIN department ON employee.id = department.dep_name;

-- JOIN 4 (for manager) --
SELECT employee.first_name, employee.last_name, employee.manager_id, manager.first_name, manager.last_name
FROM employee
INNER JOIN manager ON employee.manager_id = manager.id;