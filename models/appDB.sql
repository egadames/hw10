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
    PRIMARY KEY(id),

);

CREATE TABLE employee(
	id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY(id),

);




-- DROP DATABASE IF EXISTS employeeTracker_db;

-- CREATE DATABASE employeeTracker_db;
-- USE employeeTracker_db;

-- CREATE TABLE department(
-- 	id INT AUTO_INCREMENT NOT NULL,
--     name VARCHAR(50) NOT NULL,
--     PRIMARY KEY(id)
-- );

-- CREATE TABLE roles(
-- 	id INT AUTO_INCREMENT NOT NULL,
--     title VARCHAR(50) NOT NULL,
--     salary INT NOT NULL,
--     department_id INT NOT NULL,
--     PRIMARY KEY(id),
--     FOREIGN KEY (department_id) REFERENCES department (id)
-- );

-- CREATE TABLE employee(
-- 	id INT AUTO_INCREMENT NOT NULL,
--     first_name VARCHAR(50) NOT NULL,
--     last_name VARCHAR(50) NOT NULL,
--     role_id INT,
--     manager_id INT NULL,
--     PRIMARY KEY(id),
--     FOREIGN KEY (role_id) REFERENCES role(id),
--     FOREIGN KEY (manager_id) REFERENCES employee (id)
-- );


