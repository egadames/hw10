// const inquirer = require('inquirer');
const connection = require('../config/connection');

module.exports = {
  addDepartment: async (req, res) => {
    try {
      const query ='INSERT INTO department (name) VALUES (?)';
      const [response] = await connection.query(query, { text });
      return res.json(response);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  deleteDepartment,
  getAllDepartments: async (req, res) => {
    try {
      const query = 'SELECT * FROM department';
      const [response] = await connection.query(query);
      return res.json(response);
    } catch (e) {
      return res.json({ e });
    }
  },
}
