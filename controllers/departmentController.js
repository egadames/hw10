const inquirer = require('inquirer');
const _ = require('underscore');
const connection = require('../config/connection');
const validate = require('../models/validation');

module.exports = {
  addDepartment: async () => {
    try {
      const department = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the new department you would like to add?',
          validate: validate.confirmString,
        },
      ]);
      const query = 'INSERT INTO department (name) VALUES (?);';
      await connection.query(query, department.name);
      console.log('The department has been added');
    } catch (error) {
      if (error) throw error;
    }
  },
  deleteDepartment: async (ref) => {
    let names = await ref.getAllDepartments();
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
      await connection.query(query, department.departmentName);
      console.log('The department has been deleted');
    } catch (error) {
      if (error) throw error;
    }
  },
  getAllDepartments: async () => {
    try {
      const res = await connection.query('SELECT * FROM department;');
      console.table(res);
    } catch (error) {
      if (error) throw error;
    }
  },
};
