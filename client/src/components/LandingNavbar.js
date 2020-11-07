import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import logo from '../assets/img/logo.svg';


const LandingNavbar = () => {
    return (
        <nav>
            <Link to='/'> <img src={logo} width={128} /> </Link>
            <a className='navitem'> About us </a>
            <div className='navitem rightmost'>
                <Link to='/signin' className='btn secondary sm'> Sign in </Link> 
                <Link to='/signup' className='btn primary sm'> Register </Link>
            </div>
        </nav>
    );
}

export default LandingNavbar;