const {Role, Department} = require('../tables/models.js')
const router = {}

const owner = Department.belongsTo(Role, {as: 'department_id'});

router.getRoles = async () => {
    const role = await Role.findAll({
        attributes: [
            'id',
            'title',
            'salary'
        ]
    })
    return role.map(i => i.dataValues);
}

router.addRole = async (roleName) => {
    const {title, salary, department_id} = roleName
    console.log(title)
    if ([title, salary, department_id].includes(null) ) {
        return false;
    }
    const newRole = await Role.create({
        title, 
        salary,
        department_id
    }
    );
        return newRole.dataValues;
};

module.exports = router;

