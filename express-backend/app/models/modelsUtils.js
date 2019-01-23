var arrayToTree = require('array-to-tree');
var tree = {
    name: "Nilesh Jadhav",
    branch: "USA Milpitas",
    employee_id: "1",
    biometric_id: "6",
    username: "admin",
    level: "/",
    childNodes : [
        {
            name: "Himani Pandey",
            branch: "USA Milpitas",
            employee_id: "2",
            biometric_id: "7",
            username: "hr",
            level: "/1/",
        },
        {
            name: "Accountent1 Surname1",
            branch: "USA Milpitas",
            employee_id: "3",
            biometric_id: "8",
            username: "ac",
            level: "/2/",                    
        },
        {
            name: "Kumar Saurabh",
            branch: "India Pune",
            employee_id: "4",
            biometric_id: "9",
            username: "kumar",
            level: "/3/",
            childNodes: [
                {
                    name: "Rachit Shukla",
                    branch: "India Pune",
                    employee_id: "5",
                    biometric_id: "10",
                    username: "rachit",
                    level: "/3/1",   
                },
                {
                    name: "Jeet Singh",
                    branch: "India Pune",
                    employee_id: "6",
                    biometric_id: "11",
                    username: "jeet",
                    level: "/3/2",   
                },
                {
                    name: "Garv Gangawala",
                    branch: "India Pune",
                    employee_id: "7",
                    biometric_id: "12",
                    username: "garv",
                    level: "/3/3",   
                },
                ]             
            }
        ]                    
}
module.exports.makeTree = (employeeArray) => {
    console.log('===============================')
    console.log(employeeArray)
    console.log('===============================')
    console.log('##############')
    var array = arrayToTree(employeeArray, {
                                            parentProperty: 'parent_employee_id',
                                            childrenProperty: 'childNodes',
                                            customID: 'employee_id'})
    console.log(array[0])
    console.log('##############')
    return array[0];
}