const util = require('util');
const inquirer = require('inquirer');
const _ = require('underscore');
const connection = require('./config/connection');

connection.query = util.promisify(connection.query);

const getAllDepartments = async () => {
  try {
    const res = await connection.query('SELECT * FROM department;');
    return (res);
  } catch (error) {
    if (error) throw error;
  }
};

const addDepartment = async () => {
  try {
    const department = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the new department you would like to add?',
      },
    ]);
    const query = 'INSERT INTO department (name) VALUES (?);';
    const res = connection.query(query, department.name);
    start();
    return (res);
  } catch (error) {
    if (error) throw error;
  }
};

const deleteDepartment = async () => {
  let names = await getAllDepartments();
  names = _.pluck(names, 'name');
  try {
    const department = await inquirer.prompt([
      {
        type: 'list',
        name: 'departmentName',
        message: 'Which department would you like to remove?',
        choices: names,
      },
    ]);
    const query = 'DELETE FROM department WHERE name = ?;';
    const res = connection.query(query, department.departmentName);
    start();
    return (res);
  } catch (error) {
    if (error) throw error;
  }
};

const viewAllEmployees = async () => {
  try {
    const query = `SELECT employee.id, first_name, last_name, roles.title, department.name, roles.salary, manager_id
                  FROM employee, roles, department
                  WHERE employee.role_id = roles.id
                  AND roles.department_id = department.id`;
    const res = await connection.query(query);
    return (res);
  } catch (error) {
    if (error) throw error;
  }
};

const addNewEmployee = async () => {
  const results = await viewAllEmployees();
  const employeeTitles = _.pluck(results, 'title');

  const fullNames = [];
  for (const fullName of results) {
    fullNames.push(`${fullName['first_name']} ${fullName['last_name']}`);
  }

  try {
    const employee = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name? ",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name? ",
      },
      {
        type: 'list',
        name: 'title',
        message: "What is employee's role? ",
        choices: employeeTitles,
      },
      {
        type: 'list',
        name: 'manager',
        message: "Who is employee's manager ?",
        choices: fullNames,
      },
    ]);
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("?", "?", "?", "?");';


    let names = await getAllDepartments();
    names = _.pluck(names, 'name');
    console.log(names);

    let i;
    for (i = 0; i < names.length; i++) {
      if (employee.title === names[i]) {
        return (i);
      }
    }

    let managerID = await viewAllEmployees();
    console.log(managerID);

    let m;
    for (m = 0; m < names.length; m++) {
      if (employee.title === names[m]) {
        return (m);
      }
    }
    console.log(m)
    const res = connection.query(query, [employee.firstName, employee.lastName, i, employee.manager]);
    start();
    return (res);
  } catch (error) {
    if (error) throw error;
  }
};

const start = () => {
  inquirer
    .prompt({
      name: 'start',
      message: 'What would you like to do?',
      type: 'list',
      choices: [
        'View All Employees',
        'Add a New Employee',
        'View All Employees by Manager',
        'Update Employee Roles',
        'View All Departments',
        'Add a Department',
        'Delete a Department',
        'Exit',
      ],
    })
    .then(async (answer) => {
      switch (answer.start) {
        case 'View All Employees':
          console.table(await viewAllEmployees());
          break;
        case 'Add a New Employee':
          addNewEmployee();
          break;
        case 'View All Employees by Manager':
          viewAllEmployeesByManager();
          break;
        case 'Update Employee Roles':
          updateEmployeeRole();
          break;
        case 'View All Departments':
          console.table(await getAllDepartments());
          start();
          break;
        case 'Add a Department':
          await addDepartment();
          break;
        case 'Delete a Department':
          await deleteDepartment();
          break;
        case 'Exit':
          connection.end();
          break;
        default:
          connection.end();
      }
    });
};

start();
