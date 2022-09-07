SELECT  *
FROM departments;

SELECT *
FROM roles
JOIN departments on roles.department_id = departments.id;

SELECT  *
FROM employees
JOIN roles on employees.role_id = roles.id
JOIN employees as managers on employees.manager_ID = managers.id;

INSERT into 