import React from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';
import Slider from "react-slick";

import UserCard from '../components/UserCard';
import './Recommendations.css';
import settings from '../utils/CarouselSettings';

import logo from '../assets/img/logo.svg';
import vlad from '../assets/img/vlad2.svg';
import lara from '../assets/img/lara.svg';
import alick from '../assets/img/alick.svg';

class RecommendationPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='page-container'>
                <div className='sidebar'>
                    <Link to='/'> 
                        <img id='logo' src={logo} width={64} /> 
                    </Link>
                </div>
                <div className='page-content'>
                    <h1 className='header'>
                        Find people to study with
                    </h1>
                    <div id='online-count'> 
                        <div className='green-circle'> </div> 
                        <p> xxx people currently online </p> 
                    </div>

                    <br/><br/><br/><br/>
    
                    <h1 className='header'>
                        Same interests as you
                    </h1>
                    <div className='int-carousel'>
                        <UserCard 
                            avatar={vlad} 
                            title="Vladimir Chadweeb"
                            hobbies={['Anime', 'Gaming']}
                            bio="I wouldn't want to be my friend tbh"
                        />   
                       <UserCard 
                            avatar={alick} 
                            title="Alick Professorson"
                            hobbies={['Anime']}
                            bio="I'm a professor and I love professoring"
                        />                       
                    </div>

                    <h1 className='header'>
                        Same courses as you
                    </h1>
                    <div className='int-carousel'> 
                        <UserCard 
                            avatar={lara} 
                            title="Lara Ken"
                            hobbies={['CSC490', 'CCT110']}
                            bio="Graphic design is my passion"
                        />                         
                    </div>

                </div>

            </div>
        )
    }

}

export default RecommendationPage;