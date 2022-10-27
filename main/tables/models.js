const {Sequelize, Model, DataTypes} = require ('sequelize')

const sql = new Sequelize ({
    host: process.env.db,
    username: 'root',
    password: process.env.password,
    database: 'business_db',
    dialect: 'mysql',
    logging: false
});

const Department = sql.define('department', {
    name: DataTypes.TEXT,
    id: {type: DataTypes.INTEGER, primaryKey: true},
}, {
    timestamps: false
});


const Role = sql.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    title: DataTypes.TEXT,
    salary: DataTypes.INTEGER
},{
    timestamps: false
})

const Employee = sql.define('employee', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    First_Name: DataTypes.TEXT,
    Last_Name: DataTypes.TEXT
},{
    timestamps: false
})

Role.hasOne(Department, {as: "department_id"})

Department.belongsTo(Role)

Employee.hasOne(Role, {as: "role_id"})

Role.belongsTo(Employee)

Employee.hasOne(Employee, {as: "manager_ID"});

module.exports = {Department, Role, Employee};
