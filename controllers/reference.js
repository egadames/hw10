const connection = require('../config/connection');

const employees = async () => {
  const allEmployees = await connection.query('SELECT * FROM employee;');
  const employeeList = await allEmployees.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));
  return employeeList;
};

const roles = async () => {
  const allRoles = await connection.query('SELECT * FROM roles;');
  const allTitles = allRoles.map((title) => ({ name: title.title, value: title.id }));
  return allTitles;
};

const departmentList = async () => {
  const departments = await connection.query('SELECT * FROM department;');
  const allDepartment = await departments.map((departmentArr) => ({
    name: departmentArr.name,
    value: departmentArr.id,
  }));
  return allDepartment;
};

module.exports = {
  employees,
  roles,
  departmentList,
};
