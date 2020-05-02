/* eslint-disable radix */
/* eslint-disable no-plusplus */
const inquirer = require('inquirer');
const _ = require('underscore');
const connection = require('../config/connection');
const validate = require('../models/validation');

const getAllRoles = async () => {
  try {
    const res = await connection.query('SELECT * FROM roles;');
    console.table(res);
  } catch (error) {
    if (error) throw error;
  }
};

const getRoleId = (dep, role) => {
  let i;
  for (i = 0; i < dep.length; i++) {
    if (role === dep[i]) {
      return (i);
    }
  }
};

module.exports = {
  addRole: async (department) => {
    try {
      let departmentNames = await department.getAllDepartments();
      departmentNames = _.pluck(departmentNames, 'name');
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
          choices: departmentNames,
        },
      ]);
      const roleId = getRoleId(departmentNames, role.departmentName);
      const query = 'INSERT INTO roles (title, salary, department_id) VALUES ("?", "?", "?");';
      connection.query(query, [role.role, parseInt(role.salary), roleId]);
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
    let allRoles = await getAllRoles();
    allRoles = _.pluck(allRoles, 'title');
    try {
      const response = await inquirer.prompt([
        {
          type: 'list',
          name: 'roleName',
          message: 'Which role would you like to remove?',
          choices: allRoles,
        },
      ]);
      const query = 'DELETE FROM roles WHERE title = ?;';
      connection.query(query, response.roleName);
      console.log('The role has been deleted');
    } catch (error) {
      if (error) throw error;
    }
  },
};
