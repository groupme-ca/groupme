import React from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';

import './SignUpPage.css';
import options from '../utils/SignUpOptions';
import logo from '../assets/img/logo.svg';

const formFields = ['Name', 'Username', 'Email', 'Password'];

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            error: false,
            Name: '',
            Username: '',
            Password: '',
            Email: '',
        };
    }

    componentDidMount(props) {
        this.setState({
            stage: 1,
            nextPage: '/signup',
            Name: '',
            Username: '',
            Password: '',
            Email: '',
        });
    }

    /**
     * For now, this will just check for hardcoded values
     */
    authenticate() {
        /**
         * We input our placeholder logic for now
         */
        if (
          true
          /*
            this.state.Name ===  'a user' &&           
            this.state.Username === 'auser' && 
            this.state.Password === 'apassword' &&
            this.state.Email === 'auser@mail.utoronto.ca'
            */
        ) {
            this.setState({ error: false });
            return 0;
        } else {
            this.setState({ error: true });
            return 1;
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
                    <pre> {this.state.error ? "Error occurred" : ""}</pre>
                </center>

                {this.state.stage === 1 ? (
                    <div>
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
                                            <input type={field === "Password" ? "password" : "" } name={field} onChange={this.formEvent} /> 
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

                    </div>
                ) : (
                    <div className="select-wrapper">
                        <div>
                            <p className='select-header'> Hobbies </p>
                            <Select 
                                isMulti
                                className="select-container"
                                options={options.hobbies} 
                            />
                        </div>
                        <div>
                            <p className='select-header'> Courses </p>
                            <Select 
                                isMulti
                                className="select-container"
                                options={options.courses} 
                            />
                        </div>
                    </div>
                )}

                <Link to={this.state.nextPage} className="next-button" onClick={() => {
                    const err = this.authenticate();
                    if (!err) {
                        this.setState({
                            stage: 2,
                            nextPage: '/welcome'
                        })
                    } 
                }}>
                    {this.state.stage === 1 ? "Next" : "Sign Up"}
                </Link>

            </div>
        );
    }
}

export default SignUpPage;