import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
//import { history } from '../_helpers/history'

import { alert } from './alert.reducer'
import { authentication } from './authentication.reducer'
import { employeeTreeGet } from './employeeTree.reducer'

const createRootReducer = history =>  combineReducers({
    router: connectRouter(history),
    alert,
    authentication,
    employeeTreeGet,
})

export default createRootReducer;

