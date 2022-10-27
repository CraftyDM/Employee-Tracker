
const {Department} = require('../tables/models.js')
const router = {};



router.getDepartments =  async (req, res) => {
    const departments = await Department.findAll({
        attributes: [
            'name',
            'id'
        ]
    })
    return departments.map(i => i.dataValues) || [];
};

router.addDepartment = async (req, res) => {
    const name = req.body.name 
    if (name == null) {
        res.status(400).json({message: "Missing Name"})
        return;
    } 
    const newDepartment = await Department.create({name})
    return newDepartment
};

module.exports = router;