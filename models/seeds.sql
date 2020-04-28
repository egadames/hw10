USE employeeTracker_db;

INSERT INTO department(name)
VALUES ('Sales=1'),('Engineering=2'),('Finance=3'),('Legal=4');

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
('Leanne', 'Graham', 4, null),
('Ervin', 'Howell', 3, 1),
('Clementine', 'Bauch', 1, null),
('Patricia', 'Lebsack', 2, 3),
('Chelsey', 'Dietrich', 5, null);

INSERT INTO roles(title, salary, department_id)
VALUES 
('Sales Lead', 100000, department_id),
('Sales Lead', 100000, 1), ('Salesperson', 80000, 1),
('Lawyer', 190000, 2),
('Legal Team Lead', 250000, 2),
('Accountant', 125000, 3),
('Software Engineer', 120000, 4),
('Lead Software Engineer', 180000, 4);
