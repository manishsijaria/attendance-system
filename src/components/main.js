import React from 'react'
import { Route, Switch} from 'react-router-dom'
import  AppPage  from './appPage'
import  { Login } from './login'
import '../css/overall-layout.css'


const Register = () => <h1> Register Page </h1>
export default class Main extends React.Component {
    render() {
        return(
            <div className='center-grid'> 
                <Switch>
                    <Route exact path="/"  component={AppPage} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        )
    }
}