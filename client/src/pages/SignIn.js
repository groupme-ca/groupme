import React from "react";
import { Link, Redirect } from "react-router-dom";

import logo from "../assets/img/logo.svg";
// The following imports are for redux
// This connects the frontend to backend.
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { findUser } from "../actions/userActions";
import { getChats } from "../actions/chatActions";
import PropTypes from "prop-types";
import bgImage from "../assets/img/Untitled\ design.png";
import { getMessages } from "../actions/messageActions";

const formFields = ["Email", "Password"];

class SignInPage extends React.Component {
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
			this.setState({ error: "Invalid username or password" });
			// console.log("Unsuccessful login");
		}
	}

	handleOnLoad() {
		const chatIds = this.props.auth.user.ChatIds;
		// chatIds.forEach(id => {
		// 	console.log(id);
		chatIds.forEach((id) => {
			this.props.getChats(id);
			this.props.getMessages(id);
		});
		// });
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
			<Redirect to={"/welcome"} onload={this.handleOnLoad()} />
		);
		return (
			<div className="onboarding-container">
				<img src={bgImage} className="onboarding-bg sign-in-bg" />
				<Link to="/">
					<img id="logo" src={logo} width={128} alt="Logo" />
				</Link>
				<center>
					<h1 className="form-title">Welcome back!</h1>
				</center>
				<div>
					<div className="form-container">
						<div className="form-fields">

							<div className="form-row">
								<label> Email </label>
								<input 
									name="email" 
									onChange={this.formEvent} 
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											this.handleOnNext()
										}
									}}
								/> 
							</div>

							<div className="form-row">
								<label> Password </label>
								<input 
									name="password"
									type="password" 
									onChange={this.formEvent} 
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											this.handleOnNext()
										}
									}}
								/> 
							</div>

							<div>
								<Link 
									to={this.state.forgotPassword} 
									onClick={this.handleForgotPassword}
								>
									I forgot my password
								</Link>
							</div>

							<div className='onboarding-err'>
								<br/> <br/>
								{(this.state.error) ?
									(<label> {this.state.error} </label>) : ''
								}
							</div>
						</div>
					</div>
					{/*TODO: Add the forgotPassword link after Moh A. leaves
                         }
					{/* TODO: Add this to the right when Moh A. leaves
                    <div className='PLACEHOLDER-img'> 
                            FEATURE COMING SOON
                        </div> */}
				</div>

				{SignInLink}
			</div>
		);
	}
}

SignInPage.propTypes = {
	loginUser: PropTypes.func.isRequired,
	getChats: PropTypes.func.isRequired,
	currentUser: PropTypes.object,
	error: PropTypes.object,
	findUser: PropTypes.func.isRequired,
};
// This is the current state in the store.
const mapStateToProps = (state) => ({
	user: state.user,
	chats: state.chats,
	auth: state.auth,
	messages: state.messages,
	error: state.error,
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter.
export default connect(mapStateToProps, { getMessages, findUser, getChats, loginUser })(
	SignInPage
);
