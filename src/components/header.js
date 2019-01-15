import React from 'react'
//import '../css/navigation_ul_li.css'
import '../css/navigation_div.css'
import '../css/overall-layout.css'
import { NavLink } from 'react-router-dom'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { toggle: false }
    }

    toggleDropdown = (e) => {
        this.setState({ toggle: !this.state.toggle} )
    }

    _onBlur = () => {
        //onBlur is called on onClick event also.
        //directly changing the toggle state, does not allow the click event
        //to propogate and render the component(login for e.g.), hence we need a timer.
        setTimeout(() => {
            if (this.state.toggle) {
                this.setState({
                    toggle: false,
                });
            }
        }, 300);
    }

    render() {
        return(
            <div className="navbar ">
                <NavLink to='/home'>Home</NavLink>

                <div className="dropdown" onBlur={this._onBlur}>
                    <button className="dropbtn" onClick={this.toggleDropdown} >
                        <i className="fa fa-bars fa-lg" aria-hidden="true"></i>
                    </button>
                    {this.state.toggle &&
                    <div className="dropdown-content"  onClick={this.toggleDropdown} >
                        <NavLink to='/login'>Login</NavLink>
                        <NavLink to='/logout'>Logout</NavLink>
                        <NavLink to='/register'>Register</NavLink>
                    </div>
                    }
                </div>
            </div>                       
        )
    }
}

export default Header;

/*
            <nav className='nav'>
                <img className='logo' alt='Amiseq Inc. attendance System' src='../../images/amiseq-logo.jpg'></img>               <ul>
                    <li className='navigation_ul_li'>Amiseq Inc. Attendance System </li> 
                    <li className='navigation_ul_li Active' id='float-right'>
                        Get In 
                        <ul className='ul_direct_child_of_li'>
                            <li className='navigation_ul_li'>
                                <NavLink to='/login' className='current'>Login</NavLink>
                            </li>
                            <li className='navigation_ul_li'>
                                <NavLink to='/logout' className='current'>Logout</NavLink>
                            </li>
                            <li className='navigation_ul_li'>
                                <NavLink to='/register' className='current'>Register</NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav> 



                <ul>
                    <li><a href="#">item 1 </a></li> 
                    <li ><a href="#">item 2 </a></li>
                    <li className='Active' id='float-right'>
                        <a   href="#">Get In </a>
                        <ul>
                            <li ><a href="#">login</a></li>
                            <li ><a href="#">logout</a></li>
                            <li ><a href="#">register</a></li>
                        </ul>
                    </li>
                </ul>
*/