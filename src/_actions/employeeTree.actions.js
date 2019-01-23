
import { employeeTreeConstants  } from '../_constants'
import { employeeTreeServices } from '../_services'

export const employeeTreeActions = {
    getEmployeeTree,
}

function getEmployeeTree() {
    return (dispatch) => {
        employeeTreeServices.getEmployeeTree()
        .then(employeeTree => {
            if(!employeeTree || employeeTree === undefined) {
                let e = 'Error in getting employee hierarchy'
                dispatch(failure(e))
                //dispatch(alertActions.error(e))
            } else {
                let ParsedEmployeeTree = JSON.parse(employeeTree)
                dispatch(success(ParsedEmployeeTree))
            }
        })
    }

    function failure(error) { return {type: employeeTreeConstants.GET_EMPLOYEE_TREE_FAILURE, error }}
    function success(employeeTree) { return {type: employeeTreeConstants.GET_EMPLOYEE_TREE_SUCCESS, employeeTree }}    
}