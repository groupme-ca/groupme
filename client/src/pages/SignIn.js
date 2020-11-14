import React from "react";
import { Link, Redirect } from "react-router-dom";

import logo from "../assets/img/logo.svg";
// The following imports are for redux
// This connects the frontend to backend.
<<<<<<< HEAD
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import PropTypes from "prop-types";
=======
import { connect } from 'react-redux';
import { findUser } from '../actions/userActions';
import { getChats } from '../actions/chatActions';
import PropTypes from 'prop-types';
>>>>>>> 139767c (completed chat front end, changed pusher channel from chat-channel to id of the particpants)

const formFields = ["Email", "Password"];

class SignInPage extends React.Component {
<<<<<<< HEAD
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			Email: "",
			Password: "",
		};
	}

	handleOnNext = (e) => {
		// construct the data that we want to add into db

		const newUser = {
			email: this.state.Email,
			password: this.state.Password,
		};
		// Check for authentication
		this.authenticate(newUser);
	};

	async authenticate(user) {
		/**
		 * This checks if there was a successful login
		 * TODO: If unsuccessful, provide some feedback in react code below
		 */
		await this.props.loginUser(user);
		// CHECK FOR auth,authentication
		// We can use this error to display something on the front end.
		const error = this.props.error.msg;

		if (error) {
			this.setState({ error: true });
			// console.log("Unsuccessful login");
		}
	}

	formEvent = ({ target }) => {
		this.setState({
			[target.name]: target.value,
		});
	};

	render() {
		const SignInLink = !this.props.auth.authenticated ? (
			<Link
				to="/signin"
				className="btn primary md form-submit"
				onClick={this.handleOnNext}
			>
				Sign In
			</Link>
		) : (
			<Redirect to={"/welcome"} />
		);
		return (
			<div>
				<Link to="/">
					<img id="logo" src={logo} width={128} alt="Logo" />
				</Link>
				<center>
					<h1 className="form-title">Welcome Back!</h1>
					<pre> {this.state.error ? "Error occurred" : ""}</pre>
				</center>
				<div>
					<div className="form-container">
						<div className="form-fields">
							{formFields.map((field) => (
								<div className="form-row">
									<label> {field} * </label>
									{/* This hooks up the form to the state variable
=======
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
            //this is for getting the chat
            //this.props.getChats;
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
                    <h1 className='form-title'>
                        Welcome back!
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
>>>>>>> 139767c (completed chat front end, changed pusher channel from chat-channel to id of the particpants)
                                            also, if it's a password field it gives it the type password*/}
									<input
										type={
											field === "Password"
												? "password"
												: ""
										}
										name={field}
										onChange={this.formEvent}
									/>
								</div>
							))}
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
					<br />
					<br />
					<br />
					<br />
				</div>

				{SignInLink}
			</div>
		);
	}
}

SignInPage.propTypes = {
<<<<<<< HEAD
	loginUser: PropTypes.func.isRequired,
	error: PropTypes.object,
};

// This is the current state in the store.
const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error,
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter.
export default connect(mapStateToProps, { loginUser })(SignInPage);
=======
    findUser: PropTypes.func.isRequired,
    getChats: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired
}  

// This is the current state in the store.
const mapStateToProps = (state) => ({
    user: state.user,
    chats: state.chats
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter. 
export default connect(mapStateToProps, { findUser, getChats })(SignInPage);
>>>>>>> 139767c (completed chat front end, changed pusher channel from chat-channel to id of the particpants)
