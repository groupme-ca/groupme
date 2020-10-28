import './LandingNavbar.css';
import logo from '../assets/img/logo.svg';

const LandingNavbar = () => {
    return (
        <div className='navbar-container'>
            <img src={logo} width={128} />
            <div id='about-us'> About us </div>
            <div className='navbar-controls'>
                <div id='sign-in'> Sign in </div> 
                <div id='register'> Register </div>
            </div>
        </div>
    );
}

export default LandingNavbar;