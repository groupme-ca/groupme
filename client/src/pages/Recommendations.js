import React from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';
import Slider from "react-slick";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


import UserCard from '../components/UserCard';
import Sidebar from '../components/SideBar';
import UserModal from '../components/UserModal';
import ProfileButton from '../components/ProfileButton';
import './Recommendations.css';

import recommendations from '../utils/UserCardUtils';
import options from '../utils/SignUpOptions';
import { getChats } from "../actions/chatActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";



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
            interestNumPages: recommendations.hobbies.length < 4
                ? 1
                : 1 + Math.ceil(recommendations.hobbies.length / 4),
            coursesCurrPage: 1,
            courseNumPages: recommendations.courses.length < 4 
                ? 1
                : Math.ceil(recommendations.courses.length / 4),

            showProfile: false,
            profileCourses: [],
            profileHobbies: [],
        }
        this.showProfileModal = this.showProfileModal.bind(this);
        this.hideProfileModal = this.hideProfileModal.bind(this);
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

        
        this.getNextInterest = this.getNextInterest.bind(this);
        this.getPrevInterest = this.getPrevInterest.bind(this);
    }

    initializeChevronState(section, direction) {

        const activeStyle = {
            background: "#cacaca", 
            cursor: "pointer"
        };

        const disabledStyle = {
            background: "#efefef", 
            cursor: "unset"
        };

        if (section == 'interests') {
            if (direction == 'right') {
                return this.state.interestCurrPage < this.state.interestNumPages
                    ? activeStyle
                    : disabledStyle;
            } 

            if (direction == 'left') {
                return this.state.interestCurrPage != 1
                    ? activeStyle
                    : disabledStyle;
            }
        }

        if (section == 'courses') {
            if (direction == 'right') {
                return this.state.coursesCurrPage < this.state.courseNumPages
                    ? activeStyle
                    : disabledStyle;
            } 

            if (direction == 'left') {
                return this.state.coursesCurrPage != 1
                    ? activeStyle
                    : disabledStyle;
            }
        }
    }

    getNextInterest() {
        if (this.state.interestHasNext) {
            const currPage = this.state.interestCurrPage;
            const maxPage = this.state.interestNumPages;
            this.setState({
                interestCurrPage: currPage + 1,
                interestHasNext: (currPage + 1) < maxPage,
                interestHasPrev: true,
            })
        }
    }

    getPrevInterest() {
        if (this.state.interestHasPrev) {
            const currPage = this.state.interestCurrPage;
            const maxPage = this.state.interestNumPages;
            this.setState({
                interestCurrPage: currPage - 1,
                interestHasPrev: (currPage - 1) != 1,
                interestHasNext: (currPage - 1) < maxPage,
            })
        }
    }
    
    showProfileModal(avatar, name, courses, hobbies, bio) {
        this.setState({
            showProfile: true,
            profilePicture: avatar,
            profileName: name,
            profileCourses: courses,
            profileHobbies: hobbies,
            profileBio: bio, 
        })
    }
    hideProfileModal() {
        this.setState({
            showProfile: false
        })
    }

    render() {

        return (
            <div className='page-container'>
                <ProfileButton />
                <Sidebar activePage='search' />
                <div className='page-content'>     
                    <UserModal 
                        picture={this.state.profilePicture}
                        title={this.state.profileName}
                        courses={this.state.profileCourses}
                        hobbies={this.state.profileHobbies}
                        bio={this.state.profileBio}
                        showModal={this.state.showProfile} 
                        hideModal={this.hideProfileModal}
                    />
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
                            style={this.initializeChevronState('interests', 'left')}
                            onClick={this.getPrevInterest}
                        >
                            <ChevronLeftIcon />
                        </div>

                        <div className='carousel-wrapper'>
                            {this.state.recommendHobbies
                                .slice(this.state.interestCurrPage - 1)
                                .map((r) => (
                                    <UserCard 
                                        avatar={r.avatar} 
                                        title={r.name}
                                        tags={r.hobbies}
                                        courses={r.courses}
                                        hobbies={r.hobbies}
                                        bio={r.bio}
                                        showProfileModal={this.showProfileModal}
                                    />
                            ))}        
                        </div>


                        <div 
                            className='chevron-wrapper'
                            style={this.initializeChevronState('interests', 'right')}
                            onClick={this.getNextInterest}
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
                            style={this.initializeChevronState('courses', 'left')}
                        >
                            <ChevronLeftIcon />
                        </div>

                        <div className='carousel-wrapper'>    
                            {this.state.recommendCourses.map((r) => (
                                <UserCard 
                                    avatar={r.avatar} 
                                    title={r.name}
                                    tags={r.courses}
                                    courses={r.courses}
                                    hobbies={r.hobbies}
                                    bio={r.bio}
                                    showProfileModal={this.showProfileModal}
                                />
                            ))}              
                        </div>

                        <div 
                            className='chevron-wrapper'
                            style={this.initializeChevronState('courses', 'right')}
                        >
                            <ChevronRightIcon />
                        </div>   
                    </div>
                </div>
            </div>
        )
    }

}

RecommendationPage.propTypes = {
	getChats: PropTypes.func.isRequired,
	error: PropTypes.object,
};

// This is the current state in the store.
const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error,
	chats: state.chats
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter.
export default connect(mapStateToProps, { getChats })(RecommendationPage);
