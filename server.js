const express = require('express');
const inquirer = require('inquirer');
const connection = require('./config/connection');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const start = () => {
  inquirer
    .prompt({
      name: 'start',
      message: 'What would you like to do?',
      type: 'list',
      choices: [
        'View All Departments',
        'Add a Department',
        'Delete a Department',
      ],
    })
    .then((answer) => {
      switch (answer.start) {
        case 'View All Departments':
          getAllDepartments();
          break;
        case 'Add a Department':
          addDepartment();
          break;
        case 'Delete a Department':
          deleteDepartment();
          break;
        default:
          connection.end();
      }
    });
};

app.listen(PORT);

// 'View All Employees',
// 'View All Employees by department',
// 'View All Employees by Manager',
// 'View All Roles',

// case 'View All Employees by department':
//   viewAllEmployeesByDepartment();
//   break;
// case 'View All Employees by Manager':
//   viewAllEmployeesByManager();
//   break;
// case 'View All Roles':
//   viewAllRoles();
//   break;
// case 'View All Departments':
//   viewAllDepartment();
//   break;
// case 'Add Employee':
//   addEmployee();
//   break;
// case 'Remove Employee':
//   removeEmployee();
//   break;
// case 'Update Employee Role':
//   updateEmployeeRole();
//   break;

// const viewAll = async (req, res) => {
//   try {
//     const query = 'INSERT INTO auctions SET ?;';
//     const [todos] = await connection.query(todoQueries.findAllTodos);
//     return res.status(200).json(todos);
//   } catch (e) {
//     return res.status(403).json({ e });
//   }
//   },
// }

// const addEmployee = async (req, res) => {
//   try {
//     inquirer.prompt([
//       {
//         type: 'input',
//         name: 'firstName',
//         message: 'What is your employee's first name?',
//         // validate: confirmString
//       },
//       {
//         type: 'input',
//         name: 'lastName',
//         message: 'What is your employee's last name?',
//         // validate: confirmNumber
//       },
//       {
//         type: 'list',
//         name: 'employeeRoles',
//         message: 'What is the employee's role?',
//         choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
//         // validate: confirmEmail
//       },
//       {
//         type: 'input',
//         name: 'employeeManager',
//         message: 'Who is the employee's Manager?',
//         choices: [employees]
//       },
//      catch (error) {
//     if (error) throw error;
//   };
// }

// getAllEmployees = () => {
//   return new Promise((resolve, reject) => {
//     const query = 'SELECT * FROM employee';
//     db.query(query, (err, results, fields) => {
//       if (err) {
//         reject(err);
//       } else {
//         const employees = [];
//         for (const employee of results) {
//           const firstName = employee['first_name'];
//           const lastName = employee['last_name'];
//           employees.push(`${firstName} ${lastName}`);
//         }
//         resolve(employees);
//       }
//     });
//   });
// };

// const viewAllEmployees = async (req, res) => {
//   try {
//     const query = 'INSERT INTO auctions SET ?;';
//     const [response] = await connection.query();
//     return res.status(200).json(todos);
//   } catch (e) {
//     return res.status(403).json({ e });
//   }
// },
// };
