const inquirer = require('inquirer');
const connection = require('../config/connection');

module.exports = {
  viewAllEmployees: async () => {
    try {
      const query = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager 
      FROM employee 
      LEFT JOIN roles on employee.role_id = roles.id 
      LEFT JOIN department on roles.department_id = department.id 
      LEFT JOIN employee Manager on manager.id = employee.manager_id;`;
      const res = await connection.query(query);
      return res;
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
