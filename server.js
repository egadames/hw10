const util = require('util');
const inquirer = require('inquirer');
const _ = require('underscore');
const connection = require('./config/connection');
const cTable = require('console.table');
const department = require('./controllers/departmentController');

const addRole = async () => {
  let departmentNames = await department.getAllDepartments();
  departmentNames = _.pluck(departmentNames, 'name');
  try {
    const role = await inquirer.prompt([
      {
        type: 'input',
        name: 'role',
        message: 'Please enter the role that you would like to add: ',
      },
      {
        type: 'number',
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
    const query = 'INSERT INTO roles (title, salary, department_id) VALUES ("?", "?", "?");';
    const res = connection.query(query, [role.role, role.salary, roleId]);
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


const deleteRole = async () => {
  let allRoles = await getAllRoles();
  allRoles = _.pluck(allRoles, 'title');
  try {
    const role = await inquirer.prompt([
      {
        type: 'list',
        name: 'roleName',
        message: 'Which role would you like to remove?',
        choices: allRoles,
      },
    ]);
    const query = 'DELETE FROM roles WHERE title = ?;';
    const res = connection.query(query, role.roleName);
    start();
    return (res);
  } catch (error) {
    if (error) throw error;
  }
};

const deleteEmployee = () => {
  connection.query('SELECT * FROM employee;', (error, result) => {
    if (error) throw error;
    const employeeList = result.map((employees) => ({
      name: `${employees.first_name} ${employees.last_name}`,
      value: employees.id,
    }));
inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which role would you like to remove?',
        choices: employeeList,
      },
    ]).then((response) => {
      const query = 'DELETE FROM employee WHERE employee.id = ?;';
      connection.query(query, response.employee);
      if (error) throw error;
      console.log('Upated the Employee Role');
      start();
    });
  });
};

const updateEmployeeRole = async () => {
  connection.query('SELECT * FROM employee;', (error, result) => {
    if (error) throw error;
    const employeeList = result.map((employees) => ({
      name: `${employees.first_name} ${employees.last_name}`,
      value: employees.id,
    }));
    connection.query('SELECT * FROM roles;', (err, res) => {
      if (err) throw err;
      const allRoles = res.map((title) => ({
        name: title.title,
        value: title.id,
      }));
      inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Please pick an employee to update?: ',
          choices: employeeList,
        },
        {
          type: 'list',
          name: 'title',
          message: "Please enter the employee's new role?",
          choices: allRoles,
        },
      ]).then((response) => {
        const query = 'UPDATE employee SET role_id = ? WHERE employee.id = ?;';
        connection.query(query, [response.title, response.employee]);
        if (error) throw error;
        console.log('Upated the Employee Role');
        start();
      });
    });
  });
};

const viewAllEmployees = async () => {
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
};

const addNewEmployee = async () => {
  connection.query('SELECT * FROM employee;', (error, result) => {
    if (error) throw error;
    const employeeList = result.map((employees) => ({
      name: `${employees.first_name} ${employees.last_name}`,
      value: employees.id,
    }));
    employeeList.push('None');
    connection.query('SELECT * FROM roles;', (err, res) => {
      if (err) throw err;
      const allRoles = res.map((title) => ({
        name: title.title,
        value: title.id,
      }));
      inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "What is the employee's first name? ",
        },
        {
          type: 'input',
          name: 'lastName',
          message: "What is the employee's last name? ",
        },
        {
          type: 'list',
          name: 'title',
          message: "What is employee's role? ",
          choices: allRoles,
        },
        {
          type: 'list',
          name: 'manager',
          message: "Who is employee's manager ?",
          choices: employeeList,
        },
      ]).then((response) => {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("?", "?", "?", "?");';
        response.manager = (response.manager === 'None') ? 0000 : response.manager;
        connection.query(query, [response.firstName, response.lastName, response.title, response.manager]);
        if (error) throw error;
        console.log('Added the New Employee');
        start();
      });
    });
  });
};

const start = () => {
  inquirer
    .prompt({
      name: 'start',
      message: 'What would you like to do?',
      type: 'list',
      choices: [
        'View All Employees',
        'View All Roles',
        'View All Departments',
        'Add Role',
        'Add Employee',
        'Add Department',
        'Update Employee Roles',
        'Delete Employee',
        'Delete Role',
        'Delete Department',
        'Exit',
      ],
    })
    .then(async (answer) => {
      switch (answer.start) {
        case 'View All Employees':
          console.table(await viewAllEmployees());
          start();
          break;
        case 'Add Employee':
          await addNewEmployee();
          // start();
          break;
        case 'Delete Employee':
          await deleteEmployee();
          // start();
          break;
        case 'View All Roles':
          console.table(await getAllRoles());
          start();
          break;
        case 'Add Role':
          await addRole();
          start();
          break;
        case 'Delete Role':
          await deleteRole();
          break;
        case 'Update Employee Roles':
          updateEmployeeRole();
          break;
        case 'View All Departments':
          console.table(await department.getAllDepartments());
          start();
          break;
        case 'Add Department':
          await department.addDepartment();
          start();
          break;
        case 'Delete Department':
          await department.deleteDepartment(department);
          start();
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
