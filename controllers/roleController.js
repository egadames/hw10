const inquirer = require('inquirer');
const connection = require('../config/connection');
const validate = require('./validation');
const reference = require('./reference');

module.exports = {
  addRole: async () => {
    try {
      const role = await inquirer.prompt([
        {
          type: 'input',
          name: 'role',
          message: 'Please enter the role that you would like to add: ',
          validate: validate.confirmString,
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Please enter the salary assigned for this role: ',
          validate: validate.confirmNumber,
        },
        {
          type: 'list',
          name: 'departmentName',
          message: 'To which department would you like to add this role? ',
          choices: reference.departmentList,
        },
      ]);
      const query = 'INSERT INTO roles (title, salary, department_id) VALUES ("?", "?", "?");';
      await connection.query(query, [role.role, parseInt(role.salary), role.departmentName]);
      console.log('The new role has been added');
    } catch (error) {
      if (error) throw error;
    }
  },
  getAllRoles: async () => {
    try {
      const res = await connection.query('SELECT * FROM roles;');
      console.table(res);
    } catch (error) {
      if (error) throw error;
    }
  },
  deleteRole: async () => {
    try {
      const response = await inquirer.prompt([
        {
          type: 'list',
          name: 'roleName',
          message: 'Which role would you like to remove?',
          choices: reference.roles,
        },
      ]);
      const query = 'DELETE FROM roles WHERE id = ?;';
      connection.query(query, response.roleName);
      console.log('The role has been deleted');
    } catch (error) {
      if (error) throw error;
    }
  },
};
