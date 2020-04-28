// const inquirer = require('inquirer');
const connection = require('../config/connection');



module.exports = {
  addDepartment,
  deleteDepartment,
  getAllDepartments: async (req, res) => {
    try {
      const query = 'SELECT id AS "ID", name AS "Name" FROM department';
      const [response] = await connection.query(query);
      return res.json(response);
    } catch (e) {
      return res.json({ e });
    }
  },
}
