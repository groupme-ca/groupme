import React from 'react';
import { Link } from "react-router-dom";

import './SignUpPage.css';
import logo from '../assets/img/logo.svg';

const formFields = ['Name', 'Username', 'Email', 'Password'];

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            Name: '',
            Username: '',
            Password: '',
            Email: '',
        };
    }

    /**
     * For now, this will just check for hardcoded values
     */
    authenticate() {
        if (
            this.state.Name ==  'a user' &&           
            this.state.Username == 'auser' && 
            this.state.Password == 'apassword' &&
            this.state.Email == 'auser@mail.utoronto.ca'
        ) {
            console.log(this.state);
            alert('yes')
        } else {
            console.log(this.state);
            alert('no');
        }
    }

    formEvent = ({ target }) => {
        this.setState({ 
            [target.name]: target.value
        });
      };

    render() {
        return (
            <div>
                <Link to='/'> 
                    <img id='logo' src={logo} width={128} /> 
                </Link>
                <center>
                    <h1 className='page-title'>
                        Create your profile
                    </h1>
                </center>



                <div className='form-container'>
                    <div className='PLACEHOLDER-img'> 
                        FEATURE COMING SOON
                    </div>
                    <div className='form-fields'>
                        {formFields.map((field)  => (
                                <div className='form-row'>
                                    <label> {field} * </label>
                                    {/* This hooks up the form to the state variable
                                        also, if it's a password field it gives it the type password*/}
                                    <input type={field == "Password" ? "password" : "" } name={field} onChange={this.formEvent} /> 
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='bio-container'>
                    <label> Bio </label>
                    <input />
                </div>

                <br/><br/><br/><br/>

                <Link to='/signup' className="next-button" onClick={() => {
                    this.authenticate();
                }}>
                    Next
                </Link>
            
            </div>
        );
    }
}

export default SignUpPage;