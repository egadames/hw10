const util = require('util');
const inquirer = require('inquirer');
const _ = require('underscore');
const connection = require('./config/connection');
const cTable = require('console.table');
const department = require('./controllers/departmentController');

connection.query = util.promisify(connection.query);

const getAllDepartments = async () => {
  try {
    const res = await connection.query('SELECT * FROM department;');
    return (res);
  } catch (error) {
    if (error) throw error;
  }
};

const addDepartment = async () => {
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
    start();
    return (res);
  } catch (error) {
    if (error) throw error;
  }
};

const deleteDepartment = async () => {
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
    start();
    return (res);
  } catch (error) {
    if (error) throw error;
  }
};

const getAllRoles = async () => {
  try {
    const res = await connection.query('SELECT * FROM roles;');
    return (res);
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

const addRole = async () => {
  let departmentNames = await getAllDepartments();
  departmentNames = _.pluck(departmentNames, 'name');
  try {
    const role = await inquirer.prompt([
      {
        type: 'input',
        name: 'role',
        message: 'Please enter the role that you would like to add: ',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Please enter the salary assigned for this role: ',
      },
      {
        type: 'list',
        name: 'department',
        message: 'To which department would you like to add this role? ',
        choices: departmentNames,
      },
    ]);
    const roleId = getRoleId(departmentNames, role.department);

    console.log(roleId);
    const query = 'INSERT INTO roles (title, salary, department_id) VALUES ("?", "?", "?");';
    const res = connection.query(query, [role.role, role.salary, roleId]);
    start();
    return (res);
  } catch (error) {
    if (error) throw error;
  }
};

const deleteRole = async () => {
  let AllRoles = await getAllRoles();
  AllRoles = _.pluck(AllRoles, 'name');
  try {
    const role = await inquirer.prompt([
      {
        type: 'list',
        name: 'roleName',
        message: 'Which role would you like to remove?',
        choices: AllRoles,
      },
    ]);

    const query = 'DELETE FROM role WHERE title = ?;';
    const res = connection.query(query, role.roleName);
    start();
    return (res);
  } catch (error) {
    if (error) throw error;
  }
};

const start = () => {
  inquirer
    .prompt({
      name: 'start',
      message: 'What would you like to do?',
      type: 'list',
      choices: [
        'View All Roles',
        'Add a New Role',
        'Delete a Role',
        'Update Employee Roles',
        'View All Departments',
        'Add a Department',
        'Delete a Department',
        'Exit',
      ],
    })
    .then(async (answer) => {
      switch (answer.start) {
        case 'View All Roles':
          console.table(await getAllRoles());
          start();
          break;
        case 'Add a New Role':
          await addRole();
          start();
          break;
        case 'Delete a Role':
          viewAllEmployeesByManager();
          break;
        case 'Update Employee Roles':
          updateEmployeeRole();
          break;
        case 'View All Departments':
          console.table(await getAllDepartments());
          start();
          break;
        case 'Add a Department':
          await addDepartment();
          // start();
          break;
        case 'Delete a Department':
          await deleteDepartment();
          // start();
          break;
        case 'Exit':
          connection.end();
          break;
        default:
          connection.end();
      }
    });
};

start();

// case 'View All Employees':
//   console.table(await viewAllEmployees());
//   start();
//   break;
// case 'Add a New Employee':
//   await addNewEmployee();
//   start();
//   break;
// case 'View All Employees by Manager':
//   viewAllEmployeesByManager();
//   break;
// case 'Update Employee Roles':
//   updateEmployeeRole();
//   break;
// case 'Delete an Employee':
//   deleteEmployee();
//   break;

// 'View All Employees',
// 'Add a New Employee',
// 'View All Employees by Manager',
// 'Update Employee Roles',

// const deleteEmployee = async () => {
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

// const getManagerName = async (id) => {
//   try {
//     const query = 'SELECT * FROM employee WHERE id = ?';
//     const res = await connection.query(query, id);
//     const managerName = `${res[0]['first_name']} ${res[0]['last_name']}`;
//     return (managerName);
//   } catch (error) {
//     if (error) throw error;
//   }
// };

// const viewAllEmployees = async () => {

//   try {
//     const query = `SELECT employee.id, first_name, last_name, roles.title, department.name, roles.salary, 'manager_id'
//                   FROM employee, roles, department
//                   WHERE employee.role_id = roles.id
//                   AND roles.department_id = department.id`;
//     const res = await connection.query(query);
//     return res;
//   } catch (error) {
//     if (error) throw error;
//   }
// };

// const getEmployeeFullName = async () => {
//   const results = await viewAllEmployees();
//   // const fullNames = ['None'];
//   for (const fullName of results) {
//     fullNames.push(`${fullName['first_name']} ${fullName['last_name']}`);
//   }
//   return fullNames;
// };

// const addNewEmployee = async (res) => {
//   const check = getManagerName();
//   console.log(check);
//   const fullName = await getEmployeeFullName();
//   console.log(fullName);
//   try {
//     const employee = await inquirer.prompt([
//       {
//         type: 'input',
//         name: 'firstName',
//         message: "What is the employee's first name? ",
//       },
//       {
//         type: 'input',
//         name: 'lastName',
//         message: "What is the employee's last name? ",
//       },
//       {
//         type: 'list',
//         name: 'title',
//         message: "What is employee's role? ",
//         choices: ['Salesperson', 'Sales Lead', 'Software Engineer', 'Lead Engineer', 'Accountant', 'Account Manager', 'Lawyer', 'Legal Team Lead'],
//       },
//       {
//         type: 'list',
//         name: 'manager',
//         message: "Who is employee's manager ?",
//         choices: fullName,
//       },
//     ]);
//     const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("?", "?", "?", "?");';

//     let names = await getAllDepartments();
//     names = _.pluck(names, 'name');

//     let i;
//     for (i = 0; i < names.length; i++) {
//       if (employee.title === names[i]) {
//         return (i);
//       }
//     }

//     let m;
//     for (m = 0; m < names.length; m++) {
//       if (employee.manager === fullName[m]) {
//         return (m);
//       }
//     }
//     const addEmployee = connection.query(query, [employee.firstName, employee.lastName, i, m]);
//     res.JSON(addEmployee);
//   } catch (error) {
//     if (error) throw error;
//   }
// };