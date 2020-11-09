import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import logo from '../assets/img/logo.svg';
import search from '../assets/img/search-icon.svg';
import profile from '../assets/img/profile-icon.svg';
import red_x from '../assets/img/red_x.png';
import dm from '../assets/img/dm-icon.svg';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "",
        };
    }

    render () {
        return (
            <div className='sidebar'>
                <div className='sidebar-content'> 
                    <Link to='/'> 
                        <img id='logo' src={logo} width={64} /> 
                    </Link>
                    <br></br>
                    <Link to='/profile'>
                    <div class='sidebar-tab'> <img class='sidebar-img' src={profile} width={32} /> 
                    <span class='sidebar-text'> My Profile </span> </div>
                    </Link>
                    <Link to='/welcome'>
                    <div class='sidebar-tab'> <img class='sidebar-img' src={search} width={32} /> 
                    <span class='sidebar-text'> Search </span> </div>
                    </Link>
                    <Link to='/messaging'>
                    <div class='sidebar-tab'> <img class='sidebar-img' src={dm} width={32} /> 
                    <span class='sidebar-text'> Messaging </span> </div>
                    </Link>
                    <Link to='/'>
                    <div class='sidebar-tab'> <img class='sidebar-img' src={red_x} width={32} /> 
                    <span class='sidebar-text'> Sign Out </span> </div>
                    </Link>
                </div>
            </div>
        )
    }
  }

export default Sidebar;