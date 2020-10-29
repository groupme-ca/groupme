import React from 'react';
import { Link } from "react-router-dom";

import './SignUpPage.css';
import logo from '../assets/img/logo.svg';

const formFields = ['Username *', 'Email *', 'Password *']

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            user: '',
            password: '',
            email: '',
        };
    }

    /**
     * For now, this will just check for hardcoded values
     */
    authenticate() {
        if (
            this.state.user == 'auser' && 
            this.state.password == 'apassword' &&
            this.state.email == 'auser@mail.utoronto.ca'
        ) {
            alert('yes')
        } else {
            alert('no');
        }
    }

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
                                    <label> {field} </label>
                                    {field == 'Password *' ? <input type="password" /> : <input />}
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