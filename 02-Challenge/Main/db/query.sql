SELECT
role.title AS title,
role.salary AS salary,
department.name AS department
FROM role
LEFT JOIN department ON role.department_id = department.id;

SELECT
employee.id AS employee_id,
employee.first_name,
employee.last_name,
role.title AS role_title,
employee.manager_id AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id;
