const inquirer = require('inquirer');
const connection = require('../config/connection');
const validate = require('./validation');
const reference = require('./reference');

module.exports = {
  viewAllEmployees: async () => {
    try {
      const query = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager 
      FROM employee 
      LEFT JOIN roles on employee.role_id = roles.id 
      LEFT JOIN department on roles.department_id = department.id 
      LEFT JOIN employee Manager on manager.id = employee.manager_id;`;
      const res = await connection.query(query);
      console.table(res);
    } catch (error) {
      if (error) throw error;
    }
  },
  deleteEmployee: async () => {
    try {
      const question = await inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Which role would you like to remove?',
          choices: reference.employees,
        },
      ]);
      const query = 'DELETE FROM employee WHERE employee.id = ?;';
      connection.query(query, question.employee);
      console.log('The Employee has been deleted');
    } catch (error) {
      if (error) throw error;
    }
  },
  addNewEmployee: async () => {
    try {
      const employeeList = await reference.employees();
      employeeList.push({ name: 'None', value: 0 });
      const res = await inquirer.prompt([
        {
          type: 'input',
          name: 'first',
          message: "What is the employee's first name? ",
          validate: validate.confirmString,
        },
        {
          type: 'input',
          name: 'last',
          message: "What is the employee's last name? ",
          validate: validate.confirmString,
        },
        {
          type: 'list',
          name: 'title',
          message: "What is employee's role? ",
          choices: reference.roles,
        },
        {
          type: 'list',
          name: 'manager',
          message: "Who is employee's manager ?",
          choices: employeeList,
        },
      ]);
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("?", "?", "?", "?");';
      await connection.query(query, [res.first, res.last, res.title, res.manager]);
      console.log('Added the New Employee');
    } catch (error) {
      if (error) throw error;
    }
  },
  updateEmployeeRole: async () => {
    try {
      const questions = await inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Please pick an employee to update?: ',
          choices: reference.employees,
        },
        {
          type: 'list',
          name: 'title',
          message: "Please enter the employee's new role?",
          choices: reference.roles,
        },
      ]);
      const query = 'UPDATE employee SET role_id = ? WHERE employee.id = ?;';
      await connection.query(query, [questions.title, questions.employee]);
      console.log('The employee role has been updated!');
    } catch (error) {
      if (error) throw error;
    }
  },
};
