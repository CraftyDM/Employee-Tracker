DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT Primary KEY,
    name VARCHAR(30)
    
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT Primary Key,
    title VARCHAR(30),
    department_id INT,
    salary DECIMAL,
     FOREIGN KEY (department_id)
  REFERENCES departments(id)
  
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT Primary Key,
    First_Name VARCHAR(30) NOT NULL,
    Last_Name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_ID INT,
    FOREIGN Key (manager_ID)
    REFERENCES employees(id),
    FOREIGN Key(role_id)
    REFERENCES roles(id)
);