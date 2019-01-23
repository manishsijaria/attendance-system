
var express = require('express')
var router = express.Router();
var employeeTreeModel = require('../models/employeeTree')

router.get('/getEmployeeTree', (req,res) => {
    console.log('/employeeTree/getEmployeeTree called via get ===')
    employeeTreeModel.getEmployeeTree((result, err) => {
        if(err) {
            return res.status(404).json(JSON.stringify({msg: err}))
        }
        else {
            return res.status(200).json(JSON.stringify(result))
        }
    })
}) 

module.exports = router