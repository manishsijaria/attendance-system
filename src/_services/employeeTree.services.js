
import 'whatwg-fetch' //in each file before using fetch

export const employeeTreeServices = {
    getEmployeeTree,
}

function getEmployeeTree() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type' : 'application/json'}
    }
    return fetch('/employeeTree/getEmployeeTree', requestOptions)
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw new Error("Error in getting employee hierarchy")
            })
            .then(employeeTree => { return employeeTree})
            .catch(err => {console.log(err)})
}