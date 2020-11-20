import React from 'react';
import Select from 'react-select';
import options from '../utils/SignUpOptions';

import './Recommendations.css';
import SideBar from '../components/SideBar';

import './Profile.css';

const formFields = ['Name'];

class ProfilePage extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
        newPassword: "",
        
        changePassword: false,
       }
    }

    formEvent = ({ target }) => {
        this.setState({ 
            [target.name]: target.value,
        });
    };

    saveState = () => {
        this.setState({
            changePassword: false,
        })
    }

    render() {
        return (
            <div className='page-container'>
                <SideBar activePage="profile" />
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
                                                className="profile-info-field rw-field"
                                                defaultValue="Vladimir Chadweeb" // change this when possible
                                            /> 
                                        </div>
                                    ))
                                }
                                <div className='form-row'>
                                    <label> Email </label>
                                    <input 
                                        readOnly
                                        name="Email"
                                        className="profile-info-field ro-field"
                                        defaultValue="vlad.chadweeb69@mail.utoronto.ca"
                                        onChange={this.formEvent} 
                                    /> 
                                </div>
                                <div className='form-row'>
                                    {this.state.changePassword ? (
                                        <>
                                            <label> New Password </label>
                                            <input 
                                                type="password" 
                                                name="newPassword" 
                                                onChange={this.formEvent} 
                                                onKeyPress={(e) => {
                                                    if (e.key == "Enter") {
                                                        this.saveState();
                                                    }
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <> 
                                            <a 
                                                className='change-password'
                                                onClick={() => {
                                                    this.setState({
                                                        changePassword: true
                                                    })
                                                }}
                                            > 
                                                Change password
                                            </a>
                                        </>
                                    )}
                                </div>
                                <div 
                                    className={(this.state.newPassword.length > 0 && this.state.changePassword)
                                            ? 'form-row' : 'form-row hide'} 
                                    name="confirmPasswordDiv"
                                >
                                  <label> Confirm Password </label>
                                  <input 
                                        type="password" 
                                        name="oldPassword" 
                                        onChange={this.formEvent} 
                                        onKeyPress={(e) => {
                                            if (e.key == "Enter") {
                                                this.saveState();
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='bio-container'>
                            <label> Bio </label>
                            <textarea 
                                className="profile-info-field" 
                                defaultValue="I wouldn't want to be my friend tbh"
                            />
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