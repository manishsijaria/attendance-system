

import { employeeTreeConstants } from '../_constants'

export function employeeTreeGet(state = {employeeTree: null}, action) {
    switch(action.type) {
        case employeeTreeConstants.GET_EMPLOYEE_TREE_FAILURE:
            return {employeeTree: null }
        case employeeTreeConstants.GET_EMPLOYEE_TREE_SUCCESS:
            return {employeeTree: action.employeeTree}
        default:
            return state
    }
}