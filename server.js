const inquirer = require('inquirer');
const util = require('util');
const connection = require('./config/connection');
const department = require('./controllers/departmentController');
const employee = require('./controllers/employeeController');
const role = require('./controllers/roleController');

connection.query = util.promisify(connection.query);

const start = async () => {
  const questions = await inquirer
    .prompt({
      name: 'start',
      message: 'What would you like to do?',
      type: 'list',
      choices: [
        'View All Employees',
        'View All Roles',
        'View All Departments',
        'Add Role',
        'Add Employee',
        'Add Department',
        'Update Employee Roles',
        'Delete Employee',
        'Delete Role',
        'Delete Department',
        'Exit',
      ],
    });
  switch (questions.start) {
    case 'View All Employees':
      await employee.viewAllEmployees();
      start();
      break;
    case 'Add Employee':
      await employee.addNewEmployee();
      start();
      break;
    case 'Delete Employee':
      await employee.deleteEmployee();
      start();
      break;
    case 'View All Roles':
      await role.getAllRoles();
      start();
      break;
    case 'Add Role':
      await role.addRole(department);
      start();
      break;
    case 'Delete Role':
      await role.deleteRole();
      start();
      break;
    case 'Update Employee Roles':
      await employee.updateEmployeeRole();
      start();
      break;
    case 'View All Departments':
      await department.getAllDepartments();
      start();
      break;
    case 'Add Department':
      await department.addDepartment();
      start();
      break;
    case 'Delete Department':
      await department.deleteDepartment(department);
      start();
      break;
    case 'Exit':
      connection.end();
      break;
    default:
      connection.end();
  }
};

start();
