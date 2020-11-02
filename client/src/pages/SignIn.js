import React from 'react';
import { Link } from "react-router-dom";

import './SignUpPage.css';
import logo from '../assets/img/logo.svg';
// The following imports are for redux
// This connects the frontend to backend.
import { connect } from 'react-redux';
import { findUser } from '../actions/userActions';
import PropTypes from 'prop-types';

const formFields = ['Email', 'Password'];

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            Email: '',
            Password: ''
        };
    }

    componentDidMount(props) {
        // Get rid of this after he leaves
        this.setState({
            nextPage: '/welcome',
        });
        
    }

    handleOnNext = (e) => {           
        // construct the data that we want to add into db
        // console.log(this.state)

        const newUser = {
            "email": this.state.Email,
            "password": this.state.Password
        };
        // Call the action to add the user.
        this.props.findUser(newUser);

        // Check for authentication
        const err = this.authenticate()
        console.log(err);
        if (err) {
            console.log("Unsuccessful login");
        }
        else{
            // console.log(this.props.user.currentUser)
            this.setState({
                nextPage: '/welcome',
            });
        }
        
    };

    authenticate() {
        /**  
         * This checks if there was a successful login
         * TODO: If unsuccessful, provide some feedback in react code below
         */

        
        // const currUser = this.props.user.currentUser;

        // if (!Array.isArray(currUser) || !currUser.length) {
        //     this.setState({ error: true });
        //     // return 1;
        // } 
        // this.setState({ error: false });
        return 0;  
        
    } 

    formEvent = ({ target }) => {
        this.setState({ 
            [target.name]: target.value
        });
    };

    render() {
    //    const {currentUser} = this.props.currentUser;
        // console.log(currentUser);
        return (
            <div>
                <Link to='/'> 
                    <img id='logo' src={logo} width={128} /> 
                </Link>
                <center>
                    <h1 className='page-title'>
                        Welcome Back!
                    </h1>
                    <pre> {this.state.error ? "Error occurred" : ""}</pre>
                </center>

                <div>
                    <div className='form-container'>
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
                    {/* TODO: Add the forgotPassword link after Moh A. leaves
                    <div>
                        <Link to={this.state.forgotPassword} onClick={this.handleForgotPassword}>
                                Forgot Password?
                        </Link>    
                            
                    </div>     */}
                    {/* TODO: Add this to the right when Moh A. leaves
                    <div className='PLACEHOLDER-img'> 
                            FEATURE COMING SOON
                        </div> */}
                    <br/><br/><br/><br/>

                </div>
                <Link to={this.state.nextPage} className="next-button" onClick={this.handleOnNext}>
                    Sign In
                </Link>

            </div>
        );
    }
}

SignInPage.propTypes = {
    findUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired
}  

// This is the current state in the store.
const mapStateToProps = (state) => ({
    user: state.user
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter. 
export default connect(mapStateToProps, { findUser })(SignInPage);
