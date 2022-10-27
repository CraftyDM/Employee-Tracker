const express = require('express');
const { Employee, Role, Department } = require('../tables/models.js')

const router = {};

router.getEmployees = async () => {
    const employees = await Employee.findAll({
        attributes: [
            'First_Name',
            'Last_Name',
            'role_id',
            'manager_ID',
            'id'
        ]
    })
    return employees.map(employee => employee.dataValues)
}

router.addEmployee = async employee => {
    console.log(employee)
    const {First_Name, Last_Name, role_id, manager_ID} = employee
    if ([First_Name, Last_Name, role_id, manager_ID].includes(null)) {
        return;
    }
    const newEmployee = await Employee.create({
        First_Name,
        Last_Name,
        role_id,
        manager_ID
    })
    return newEmployee.dataValues
};

router.updateEmployeeRole, async (id, role) => {
    if([role, id].includes(null)) {
        return;
    }
    const employee = await Employee.findByPk(id)
    if (employee === null) {
        return;
    }

    const updatedEmpl = await Employee.update(
        {
            role_id: role,
        },
        {
            where: {id: employee.id}
        })
    return {message: `Updated ${updatedEmpl[1]} employees`}
};


module.exports = router;