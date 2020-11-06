import React from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';
import Slider from "react-slick";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


import UserCard from '../components/UserCard';
import Sidebar from '../components/SideBar';
import './Recommendations.css';

import recommendations from '../utils/UserCardUtils';
import options from '../utils/SignUpOptions';

class RecommendationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendHobbies: recommendations.hobbies, // modify this later to read from DB
            recommendCourses: recommendations.courses, // modify this later to read from DB

            interestHasNext: false,
            interestHasPrev: false,
            coursesHasNext: false,
            coursesHasPrev: false,

            /** modify later to add support for scrolling */
            interestCurrPage: 1,
            interestNumPages: Math.ceil(recommendations.hobbies.length / 2),
            coursesCurrPage: 1,
            courseNumPages: Math.ceil(recommendations.courses.length / 2),
        }
    }

    componentDidMount(props) {
        if (this.state.interestCurrPage < this.state.interestNumPages) {
            this.setState({
                interestHasNext: true,
            })
        }

        if (this.state.coursesCurrPage < this.state.courseNumPages) {
            this.setState({
                coursesHasNext: true,
            })
        }

        if (this.state.interestCurrPage != 1) {
            this.setState({
                interestHasPrev: true,
            })
        }

        if (this.state.coursesCurrPage != 1) {
            this.setState({
                coursesHasPrev: true,
            })
        }
    }

    initializeChevronState(section, direction) {

        if (section == 'interests') {
            if (direction == 'right') {
                return this.state.interestCurrPage < this.state.interestNumPages
                    ? "#cacaca" 
                    : "#efefef";
            } 

            if (direction == 'left') {
                return this.state.interestCurrPage != 1
                    ? "#cacaca" 
                    : "#efefef";
            }
        }

        if (section == 'courses') {
            if (direction == 'right') {
                return this.state.coursesCurrPage < this.state.courseNumPages
                    ? "#cacaca" 
                    : "#efefef";
            } 

            if (direction == 'left') {
                return this.state.coursesCurrPage != 1
                    ? "#cacaca" 
                    : "#efefef";
            }
        }
    }

    render() {
        return (
            <div className='page-container'>
                <Sidebar></Sidebar>
                <div className='page-content'>
                    <h1 className='header'>
                        Find people to study with
                    </h1>
                    <div id='online-count'> 
                        <div className='green-circle'> </div> 
                        <p> 000 people currently online </p> 
                    </div>

                    
                    <div class="filter-section">
                        <input 
                            placeholder='Search'
                            class="filter-input"
                        />
                    </div>
                    <p className='select-header'> Filter By: </p>
                    <div className="filter-section">
                        <div>
                            <Select 
                                isMulti
                                className="filter-container"
                                options={options.hobbies} 
                                st
                                placeholder="Hobbies"
                            />
                        </div>
                        <div>
                            <Select 
                                isMulti
                                className="filter-container"
                                options={options.courses} 
                                placeholder="Courses"
                            />
                        </div>
                        <div className='btn primary sm'> Filter </div>
                    </div>
    
                    <h1 className='header'>
                        Same interests as you
                    </h1>

                    <div className='carousel-container'>
                        <div 
                            className='chevron-wrapper'
                            style={{ background:  this.initializeChevronState('interests', 'left')}}
                            onClick={(e) => {
                                if (this.state.interestHasPrev) {
                                    const p = this.state.interestCurrPage - 1;
                                    this.setState({
                                        interestCurrPage: p
                                    })
                                }
                            }}
                        >
                            <ChevronLeftIcon />
                        </div>

                        <div className='carousel-wrapper'>
                            {this.state.recommendHobbies.map((r) => (
                                <UserCard 
                                    avatar={r.avatar} 
                                    title={r.name}
                                    tags={r.hobbies}
                                    bio={r.bio}
                                />
                            ))}        
                        </div>


                        <div 
                            className='chevron-wrapper'
                            style={{ background:  this.initializeChevronState('interests', 'right')}}
                            onClick={(e) => {
                                if (this.state.interestHasNext) {
                                    const p = this.state.interestCurrPage + 1;
                                    this.setState({
                                        interestCurrPage: p
                                    })
                                }
                            }}
                        >
                            <ChevronRightIcon />
                        </div>
                    </div>
                    

                    <h1 className='header'>
                        Same courses as you
                    </h1>

                    <div className='carousel-container'>
                        <div 
                            className='chevron-wrapper'
                            style={{ background:  this.initializeChevronState('courses', 'left')}}
                        >
                            <ChevronLeftIcon />
                        </div>

                        <div className='carousel-wrapper'>    
                            {this.state.recommendCourses.map((r) => (
                                <UserCard 
                                    avatar={r.avatar} 
                                    title={r.name}
                                    tags={r.courses}
                                    bio={r.bio}
                                />
                            ))}              
                        </div>

                        <div 
                            className='chevron-wrapper'
                            style={{ background:  this.initializeChevronState('courses', 'right')}}
                        >
                            <ChevronRightIcon />
                        </div>   
                    </div>
                </div>
            </div>
        )
    }

}

export default RecommendationPage;