require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const ctable = require('console.table');

const departments = require('./main/routes/departmentRoute.js');
const roles = require('./main/routes/roleRoute.js');
const employees = require('./main/routes/employeeRoute.js');
const { Role } = require('./main/tables/models.js');


const port = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const choicesEnum = [
    "View All Departments",
    "View all roles",
    "view all employees",
    "add a role",
    "add an employee",
    "update employee",
    "update manager",
    "view employee by manager",
    // "delete departments, roles, and/or employees-add later",
    "exit"
]

let on = true, userInput = "";

async function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainMenu',
                message: "What would you like to do?",

                choices: choicesEnum
            }
        ]).then(async answers => {
            switch (answers.mainMenu) {
                case choicesEnum[0]:
                    var data = await departments.getDepartments();
                    if (data.length < 1) {
                        console.log("nothing to display");
                    } else {
                        console.table(data)
                    }
                    break;
                case choicesEnum[1]:
                    var data = await roles.getRoles();
                    if (data.length < 1) {
                        console.log("nothing to display");
                    } else {
                        console.table(data)
                    }
                    break;

                case choicesEnum[2]:
                    var data = await employees.getEmployees();
                    if (data.length < 1) {
                        console.log("nothing to display");
                    } else {
                        console.table(data)
                    }
                    break;

                case choicesEnum[3]:
                    const roleName = await queryUser('Role Name')
                    const departmentList = await departments.getDepartments();
                    const salary = await queryUser('Salary for Role')
                    const roleDepartment = await queryUserByList('Which Department?', departmentList)
                    var data = await roles.addRole({
                        title: roleName,
                        salary,
                        department_id: departmentList.filter(i => i.name == roleDepartment)[0].id
                    });
                    if (data.length < 1) {
                        console.log("nothing to display");
                    } else {
                        console.table(data)
                    }

                    break;

                case choicesEnum[4]:
                    const First_Name = await queryUser('First Name')
                    const Last_Name = await queryUser('Last Name')
                    const roleList = await roles.getRoles()
                    const employeeList = await employees.getEmployees()
                    const role = await queryUserByList('Select Role', roleList.map(i => i.title))
                    const manager = await queryUserByList('Direct Manager', employeeList.map(i => `${i.First_Name} ${i.Last_Name}`))
                    var data = await employees.addEmployee({
                        First_Name,
                        Last_Name,
                        role_id: roleList.filter(r => r.title == role)[0].id,
                        manager_ID: employeeList.filter(m => `${m.First_Name} ${m.Last_Name}` == manager)[0].id
                    });

                   
                    if (data.length < 1) {
                        console.log("nothing to display");
                    } else {
                        console.table(data)
                    }
                    break;
                case choicesEnum[5]:
                    const listOfEmployees = await employees.getEmployees()
                    const listOfRole = await roles.getRoles()
                    const employeeToUpdate = await queryUserByList('Employee To Update', listOfEmployees.map(i => `${i.First_Name} ${i.Last_Name}`))
                    const newRole = await queryUserByList('Updated Role', listOfRole.map(i => i.title))
                    var data = employees.UpdateEmployee(listOfEmployees.filter(e => `${e.First_Name} ${e.Last_Name}` == employeeToUpdate)[0].id,
                        listOfRole.filter(r => r.title == newRole)[0].id);
                    if (data.length < 1) {
                        console.log("nothing to display");
                    } else {
                        console.table(data)
                    }
                    break;
                // case choicesEnum[6]:
                //     var data = employees.updateManager();
                //     if (data.length < 1) {
                //         console.log("nothing to display");
                //     } else {
                //         console.table(data)
                //     }
                //     break;
                // case choicesEnum[7]:
                //     var data = employees.getManager();
                //     if (data.length < 1) {
                //         console.log("nothing to display");
                //     } else {
                //         console.table(data)
                //     }
                //     break;
                // case choicesEnum[8]:
                //     var data = destroy();
                //     if (data.length < 1) {
                //         console.log("nothing to display");
                //     } else {
                //         console.table(data)
                //     }
                //     break;

                case choicesEnum[8]: //change to 9 if delete is added
                    on = false
                    break;
            }
            if (on) init()
        });

}

init();

const queryUser = async query => {

    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'data',
                message: query
            }
        ])
        return answers.data;
    } catch (err) {
        console.error(err)
        return ''
    };

};

const queryUserByList = async (query, list) => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'data',
                message: query,
                choices: list
            }
        ])
        return answers.data
    } catch (err) {
        console.error(err)
        return ''
    }

}

