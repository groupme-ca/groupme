import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './LandingNavbar.css';
import logo from '../assets/img/logo.svg';


const LandingNavbar = () => {
    return (
        <div className='navbar-container'>
            <Link to='/'> <img src={logo} width={128} /> </Link>
            <div id='about-us'> About us </div>
            <div className='navbar-controls'>
                <Link to='/signin' id='sign-in'> Sign in </Link> 
                <Link to='/signup' id='register'> Register </Link>
            </div>
        </div>
    );
}

export default LandingNavbar;