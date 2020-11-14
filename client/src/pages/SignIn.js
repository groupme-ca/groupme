import React from "react";
import { Link, Redirect } from "react-router-dom";

import logo from "../assets/img/logo.svg";
// The following imports are for redux
// This connects the frontend to backend.
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import PropTypes from "prop-types";

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
	loginUser: PropTypes.func.isRequired,
	currentUser: PropTypes.object,
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
