
INSERT INTO departments (name)
VALUES ('Management');
INSERT INTO departments (name)
VALUES ('Sales');
INSERT INTO departments (name)
VALUES ('Accounting');
INSERT INTO departments (name)
VALUES ('Reception');
INSERT INTO departments (name)
VALUES ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES ('General Manager', 120000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ('Salesman', 80000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ('Accountant', 90000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ('Receptionist', 40000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ('Human Resource Officer', 75000, 5);
INSERT INTO roles (title, salary, department_id)
VALUES ('CEO', 250000, null);

INSERT INTO employees (First_Name, Last_Name, role_id, manager_id, id)
VALUES ('Michael', 'Sott', 1, null, 1);
INSERT INTO employees (First_Name, Last_Name, role_id, manager_id, id)
VALUES ('Jim', 'Halpert', 2, 1, 2);
INSERT INTO employees (First_Name, Last_Name, role_id, manager_id, id)
VALUES ('Dwight', 'Schrute', 2, 1, 3);
INSERT INTO employees (First_Name, Last_Name, role_id, manager_id, id)
VALUES ('Pam', 'Beasley', 4, 1, 4);
INSERT INTO employees (First_Name, Last_Name, role_id, manager_id, id)
VALUES ('Kevin', 'Malone', 3, 1, 5);
INSERT INTO employees (First_Name, Last_Name, role_id, manager_id, id)
VALUES ('Toby', 'Flannagan', 5, 2, 6);
INSERT INTO employees (First_Name, Last_Name, role_id, manager_id, id)
VALUES ('Robert', 'California', 6, null, 7);
