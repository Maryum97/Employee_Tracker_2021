DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
id INTEGER (100) auto_increment NOT NULL,
name VARCHAR (100) NOT NULL,
PRIMARY KEY (id)
);

SELECT * FROM department;

CREATE TABLE role (
id INTEGER (100) auto_increment NOT NULL,
title VARCHAR (100) NOT NULL,
salary DECIMAL (10, 2) NOT NULL,
department_id INTEGER (100) NOT NULL,
PRIMARY KEY (id)
);

SELECT * FROM role;

CREATE TABLE employee (
id INTEGER (100) auto_increment NOT NULL,
first_name VARCHAR (100) NOT NULL,
last_name VARCHAR (100) NOT NULL,
role_id INTEGER (100) NOT NULL,
manager_id INTEGER (100),
PRIMARY KEY (id)
);

SELECT * FROM employee;