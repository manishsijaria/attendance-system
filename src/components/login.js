
import React from 'react'

import '../css/login.css'

import { connect } from 'react-redux'
import { userActions } from '../_actions'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'admin',
            password: 'admin',
            submitted: false
        }
    }
    
    
    componentWillMount() {
        const URL = this.props.match.url
        const { dispatch, loggedIn, user } = this.props
        if(URL.indexOf('/logout') !== -1) {
            dispatch(userActions.logout())
        } else { //login page, when pressing back button goes to login page, set the username of loggedin user.
            if(loggedIn) {
                this.setState({username: user.username})
            }
        }
    }

    handelChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name] : value
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ submitted: true})
        //TODO: goto / path, having projects on the left.
        //alert(this.state.username + ' ' + this.state.password)
        const { username, password } = this.state

        
        const { dispatch } = this.props
        if(username && password) {
            dispatch(userActions.login(username,password))
        }
        
    }
    
    render() {
        const { username, password } = this.state
        return(
            <div id='container'>
                <h3 style={{ textAlign: 'center'}}>Login</h3>
                <form name="form" onSubmit={this.handleSubmit}>
                    <label for="username"><b>Username</b></label>
                    <input type="text" name="username" value={username} onChange={this.handelChange}/>
                    <div id='lower'>
                        <label for="password"><b>Password</b></label>
                        <input type="password" name="password" value={password} onChange={this.handelChange}/>
                    </div>
                    <input type="submit" value="Login"/>
                    
                    {/*<Link to="/register"> Register </Link>*/ }
                </form>
            </div>
        )
    }
}



function mapStateToProps(state) {
    const { loggingIn, loggedIn, user } = state.authentication
    return { loggingIn,loggedIn, user }
}

const connectedLogin = connect(mapStateToProps)(Login)

export {connectedLogin as Login}
