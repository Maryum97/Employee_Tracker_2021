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

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;


-- JOIN STATEMENTS HERE --

-- JOIN 1 -- 
SELECT employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, role.department_id, department.dep_name
FROM employee
INNER JOIN role ON employee.id = role.id
LEFT JOIN department ON employee.id = department.dep_name;

-- JOIN 2 --
SELECT employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, role.department_id
FROM employee
INNER JOIN role ON employee.id = role.id;

-- JOIN 3 --
SELECT employee.first_name, employee.last_name, department.dep_name
FROM employee
LEFT JOIN department ON employee.id = department.dep_name;