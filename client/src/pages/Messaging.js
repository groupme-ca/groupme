import React from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';
import Slider from "react-slick";

import UserCard from '../components/UserCard';
import Sidebar from '../components/SideBar';
import './Recommendations.css';
import settings from '../utils/CarouselSettings';
import options from '../utils/SignUpOptions';

import logo from '../assets/img/logo.svg';
import vlad from '../assets/img/vlad2.svg';
import lara from '../assets/img/lara.svg';
import alick from '../assets/img/alick.svg';

class MessagingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='page-container'>
                <Sidebar></Sidebar>
                <div className='page-content'>
                  <input></input>
                </div>
            </div>
        )
    }

}

export default MessagingPage;