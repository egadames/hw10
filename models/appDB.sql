DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE department(
	id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles(
	id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(50) NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee(
	id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY(id)
);

-- This is the primary database

USE employeeTracker_db;

INSERT INTO department(name)
VALUES ('Sales'),('Legal'),('Finance'),('Engineering');

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
('Leanne', 'Graham', 4, null),
('Ervin', 'Howell', 3, 1),
('Clementine', 'Bauch', 1, null),
('Patricia', 'Lebsack', 2, 3),
('Chelsey', 'Dietrich', 5, null);

INSERT INTO roles(title, salary, department_id)
VALUES 
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lawyer', 190000, 2),
('Legal Team Lead', 250000, 2),
('Accountant', 125000, 3),
('Account Manager', 200000, 3),
('Software Engineer', 120000, 4),
('Lead Software Engineer', 180000, 4);


