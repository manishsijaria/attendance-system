
var getConnection = require('../../config/dbconnection')
var modelsUtils = require('./modelsUtils')

const EMPLOYEE_TREE_QUERIES = {
    getAllEmployees : 
    `
    select branch.country, branch.city, branch.name as branch_name, designation.name as designation_name, 
		employee.employee_id, concat(employee.firstname, ' ', employee.lastname) as name, employee.username,
        employee.level, employee.parent_employee_id
    from employee, branch, designation 
    where employee.branch_id = branch.branch_id and
        employee.designation_id = designation.designation_id
    `,
}


module.exports.getEmployeeTree = (callback) => {

    getConnection((err,connection) => {
        connection.query(EMPLOYEE_TREE_QUERIES.getAllEmployees,[], (err, result) => {
            connection.release()
            if(err) {
                callback(null,err)
                console.log('Error in getting employees list')
            } else {
                var tree = modelsUtils.makeTree(JSON.parse(JSON.stringify(result)))
                callback(tree, null) 
            }
        })
    })
}

