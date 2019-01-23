
var express = require('express');
var router = express.Router();


router.use('/users', require('./users'));
router.use('/employeeTree', require('./employeeTree'))


module.exports = router;