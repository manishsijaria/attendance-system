
import { userConstants } from '../_constants'
import { userService } from '../_services'
import { alertActions } from './'

//
import { push } from 'connected-react-router'

export const userActions = {
    login,
    logout,
    register
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        
        userService.login(username, password)
            .then(
                user => {
                    //alert('Login Success on Client:' + user)
                    if(!user || user === 'undefined') {
                        let e = 'Invalid login credentials'
                        dispatch(failure(e))
                        dispatch(alertActions.error(e))    
                    } else {
                        let Parseduser = JSON.parse(user)
                        dispatch(success(Parseduser))
                        dispatch(push('/landingpage'))
                    }
                })
    }
    function request(user) { return {type: userConstants.LOGIN_REQUEST, user }}
    function success(user) { return {type: userConstants.LOGIN_SUCCESS, user}}
    function failure(error) { return {type: userConstants.LOGIN_FAILURE, error}}
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    if(!user || user === 'undefined') {
                        //alert(JSON.stringify(user))
                        let e = 'User is already registered'
                        dispatch(failure(e))
                        dispatch(alertActions.error(e))    
                    } else {
                        //alert(JSON.stringify(user))
                        dispatch(success());
                        dispatch(push('/login'))
                        dispatch(alertActions.success('Registration successful'));
                    }
                } 
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
