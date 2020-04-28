// const inquirer = require('inquirer');
const connection = require('../config/connection');

const getDepartmentID = (departmentName) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id FROM department WHERE name = ?';
    connection.query(query, [departmentName], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].id);
      }
    });
  });
};

const insertDepartment = (departmentName) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO department (name) VALUES (?)';
    connection.query(query, [departmentName], err => {
      if (err) {
        reject(err);
      } else {
        console.log('Success');
        resolve();
      }
    });
  });
};

const deleteDepartment = (departmentName) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM department WHERE name = ?';
    connection.query(query, [departmentName], err => {
      if (err) {
        reject(err);
      } else {
        resolve('Success');
      }
    });
  });
};

// const getAllDepartments = () => {
//   return new Promise((resolve, reject) => {
//     const query = 'SELECT id AS "ID", name AS "Name" FROM department';
//     connection.query(query, (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };

module.exports = {
  getDepartmentID,
  insertDepartment,
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
