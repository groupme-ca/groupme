import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SideBar.css';
import logo from '../assets/img/logo.svg';

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
          <Link to='/'> 
              <img id='logo' src={logo} width={64} /> 
          </Link>
          <br></br>
          <Link to='/profile'>
            <div class='sidebar-tab'> Profile Page </div>
          </Link>
          <Link to='/welcome'>
            <div class='sidebar-tab'> Recommendation Page </div>
          </Link>
        </div>
        )
    }
  }

export default Sidebar;