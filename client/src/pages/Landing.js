import LandingNavbar from '../components/LandingNavbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Lshape from '../assets/img/asset-3-L.svg';
import ballshape from '../assets/img/asset-4-ball.svg';
import './Landing.css';

const LandingPage = () => {
    return (
        <div>
            <LandingNavbar />
            <img src={Lshape} className='L-icon' width={256}/>
            <img src={ballshape} className='ball-icon' width={256}/>
            <div className="main">
            <header className="main-header">
                <h1 className="main-title"> Connecting students virtually </h1>
                <Link
                    className="get-started"
                    to='/signup'
                >
                    Get started
                </Link>
                <div className='sub-title-container'>
                    <h3 className='sub-title-prompt'> Are you a professor? </h3>
                    <h3 className='sub-title-cta'> Add your class</h3>
                </div>
            </header>
            </div>
        </div>
    );
}

export default LandingPage;