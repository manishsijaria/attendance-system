
var StaticNodeIndex = require('../utilities/StaticNodeIndex')
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
    //console.log('===============================')
    //console.log(employeeArray)
    //console.log('===============================')
    console.log('##############')
    var array = arrayToTree(employeeArray, {
                                            parentProperty: 'parent_employee_id',
                                            childrenProperty: 'childNodes',
                                            customID: 'employee_id'})
    //console.log(array[0])
    console.log('##############')
    StaticNodeIndex.reset();
    var tree = this.traverseTree(array[0])
    console.log(tree)
    //var node = this.searchTree(array[0],'name','Manish Sijaria')
    //console.log(node)
    return tree;
}

module.exports.traverseTree = (tree ,slug) => {
    slug = slug || '/';
    console.log(slug + tree.name + '/');
    tree.id = StaticNodeIndex.getNextIndex();
    if( !(tree.childNodes === undefined)) {
        tree.expanded = false
        for(var i = 0; i < tree.childNodes.length; i++) {
            this.traverseTree(tree.childNodes[i], slug + tree.name + '/')
        }
    }
    return tree;
}

module.exports.searchTree = (tree, prop, value) => {
    if(tree[prop] === value) {
        return tree
    } else if (!(tree.childNodes === undefined)) {
        var i;
        var node = null;
        for(i=0; node == null && i < tree.childNodes.length; i++) {
            node = this.searchTree(tree.childNodes[i],prop ,value)
        }
        return node;
    }
    return null;
}