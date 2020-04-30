const util = require('util');
const inquirer = require('inquirer');
const _ = require('underscore');
const connection = require('../config/connection');
connection.query = util.promisify(connection.query);

module.exports = {
  addDepartment: async () => {
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
      // start();
      return (res);
    } catch (error) {
      if (error) throw error;
    }
  },
  deleteDepartment: async () => {
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
      // start();
      return (res);
    } catch (error) {
      if (error) throw error;
    }
  },
  getAllDepartments: async () => {
    try {
      const res = await connection.query('SELECT * FROM department;');
      return (res);
    } catch (error) {
      if (error) throw error;
    }
  },
};


// const getAllDepartments = async () => {
//   try {
//     const res = await connection.query('SELECT * FROM department;');
//     return (res);
//   } catch (error) {
//     if (error) throw error;
//   }
// };

// const addDepartment = async () => {
//   try {
//     const department = await inquirer.prompt([
//       {
//         type: 'input',
//         name: 'name',
//         message: 'Enter the new department you would like to add?',
//       },
//     ]);
//     const query = 'INSERT INTO department (name) VALUES (?);';
//     const res = connection.query(query, department.name);
//     start();
//     return (res);
//   } catch (error) {
//     if (error) throw error;
//   }
// };

// const deleteDepartment = async () => {
//   let names = await getAllDepartments();
//   names = _.pluck(names, 'name');
//   try {
//     const department = await inquirer.prompt([
//       {
//         type: 'list',
//         name: 'departmentName',
//         message: 'Which department would you like to remove?',
//         choices: names,
//       },
//     ]);
//     const query = 'DELETE FROM department WHERE name = ?;';
//     const res = connection.query(query, department.departmentName);
//     start();
//     return (res);
//   } catch (error) {
//     if (error) throw error;
//   }
// };