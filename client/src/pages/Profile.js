import React from 'react';
import Select from 'react-select';
import options from '../utils/SignUpOptions';

import './Recommendations.css';
import SideBar from '../components/SideBar';

const formFields = ['Name', 'Username', 'Email'];

import logo from '../assets/img/logo.svg';
import vlad from '../assets/img/vlad.jpg';
import lara from '../assets/img/lara.jpg';
import alick from '../assets/img/alick.jpg';


class ProfilePage extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
        newPassword: "",
       }
    }

    formEvent = ({ target }) => {
        this.setState({ 
            [target.name]: target.value
        });
    };

    render() {
        return (
            <div className='page-container'>
                <SideBar></SideBar>
                <div className='page-content'>
                <h1 className='page-title'>
                      User Profile
                </h1>
                <div>
                        <div className='form-container'>
                          <div class="container">
                            <img class="card-img-top card-profile-pic" src="/static/media/vlad.58e00b26.jpg" height="128"></img>
                            <div class="edit-img-overlay">Edit</div>
                          </div>
                            <div className='form-fields'>
                                {formFields.map((field)  => (
                                        <div className='form-row'>
                                            <label> {field} </label>
                                            {/* This hooks up the form to the state variable
                                                also, if it's a password field it gives it the type password*/}
                                            <input 
                                                name={field} 
                                                onChange={this.formEvent} 
                                            /> 
                                        </div>
                                    ))
                                }
                                <div className='form-row'>
                                  <label> New Password </label>
                                  <input type="password" name="newPassword" onChange={this.formEvent} />
                                </div>
                                <div className={this.state.newPassword.length > 0 ? 'form-row' : 'form-row hide'} name="confirmPasswordDiv">
                                  <label> Confirm Password </label>
                                  <input type="password" name="oldPassword" onChange={this.formEvent} />
                                </div>
                            </div>
                        </div>

                        <div className='bio-container'>
                            <label> Bio </label>
                            <textarea />
                        </div>
                        
                        <div className="filter-section margin-left">
                            <div>
                                <p className='select-header'> Hobbies </p>
                                <Select 
                                    isMulti
                                    className="filter-container"
                                    options={options.hobbies} 
                                />
                            </div>
                            <div>
                                <p className='select-header'> Courses </p>
                                <Select 
                                    isMulti
                                    className="filter-container"
                                    options={options.courses} 
                                />
                            </div>
                        </div>
                        <br/><br/><br/><br/>

                    </div>
                </div>
            </div>
        )
    }

}

export default ProfilePage;