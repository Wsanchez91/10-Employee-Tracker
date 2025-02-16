
const { Pool } = require('pg');
let pool;

function setPool(dbPool) {
    pool = dbPool;
}

async function viewDepartments() {
    const result = await pool.query('SELECT * FROM department');
    console.table(result.rows);
}

async function viewRoles() {
    const result = await pool.query(`
        SELECT role.id, role.title, department.name AS department, role.salary 
        FROM role 
        LEFT JOIN department ON role.department_id = department.id`);
    console.table(result.rows);
}

async function viewEmployees() {
    const result = await pool.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, employee.manager_id 
        FROM employee 
        LEFT JOIN role ON employee.role_id = role.id 
        LEFT JOIN department ON role.department_id = department.id`);
    console.table(result.rows);
}

async function addDepartment() {
    const { name } = await require('inquirer').prompt([{ 
        type: 'input', name: 'name', message: 'Enter department name:' 
    }]);
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log('Department added.');
}

async function addRole() {
    const { title, salary, department_id } = await require('inquirer').prompt([
        { type: 'input', name: 'title', message: 'Enter role title:' },
        { type: 'input', name: 'salary', message: 'Enter role salary:' },
        { type: 'input', name: 'department_id', message: 'Enter department ID:' }
    ]);
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log('Role added.');
}

async function addEmployee() {
    const { first_name, last_name, role_id, manager_id } = await require('inquirer').prompt([
        { type: 'input', name: 'first_name', message: 'Enter first name:' },
        { type: 'input', name: 'last_name', message: 'Enter last name:' },
        { type: 'input', name: 'role_id', message: 'Enter role ID:' },
        { type: 'input', name: 'manager_id', message: 'Enter manager ID (or leave blank):', default: null }
    ]);
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    console.log('Employee added.');
}

async function updateEmployeeRole() {
    const { employee_id, role_id } = await require('inquirer').prompt([
        { type: 'input', name: 'employee_id', message: 'Enter employee ID:' },
        { type: 'input', name: 'role_id', message: 'Enter new role ID:' }
    ]);
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
    console.log('Employee role updated.');
}

module.exports = { setPool, viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };
