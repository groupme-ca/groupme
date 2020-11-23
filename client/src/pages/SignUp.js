import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import options from "../utils/SignUpOptions";
import logo from "../assets/img/logo.svg";

// The following imports are for redux
// This connects the frontend to backend.
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import PropTypes from "prop-types";

const formFields = ["Name", "Email", "Password"];

class SignUpPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: 1,
			error: false,
			errorMsg: "",
			Name: "",
			Password: "",
			Email: "",
			bio: "",
			hobbies: [],
			courses: [],
		};
	}

	componentDidMount(props) {
		this.setState({
			stage: 1,
			nextPage: "/signup",
		});
	}

	handleBio = (event) => {
		this.setState({ bio: event.target.value });
	};
	handleOnSelectHobbies = (selectedOptions) => {
		this.setState({ hobbies: selectedOptions });
	};

	handleOnSelectCourses = (selectedOptions) => {
		this.setState({ courses: selectedOptions });
	};

	handleOnNext = (e) => {
		if (this.state.stage === 1 && !this.authenticate()) {
			this.setState({
				stage: 2,
				nextPage: "/welcome",
			});
		} else if (this.state.stage === 2) {
			// construct the data that we want to add into db
			const newUser = {
				name: this.state.Name,
				email: this.state.Email,
				password: this.state.Password,
				bio: this.state.bio,
				hobbies: this.state.hobbies,
				courses: this.state.courses,
			};
			// Call the action to add the user.
			this.props.registerUser(newUser);
		}
	};
	/**
	 * For now, this will just check for hardcoded values
	 */
	authenticate() {
		/**
		 * We input our placeholder logic for now
		 *
		 *      Strip spaces on the right for each field.
		 *      Check for valid email (@mail.utoronto.ca)
		 *
		 */
		let name = this.state.Name;
		let email = this.state.Email;
		let password = this.state.Password;
		// Trim the name and email but not the password
		name = name.trim();
		email = email.trim().toLowerCase();

		/**
		 * Do regex testing
		 */
		// Name, includes upto 3 name fields (First Middle Last):
		let name_re = /^([A-Za-z]+ ?){1,3}$/;
		const valid_name = name_re.test(name);
		// Email, this matches in the form of x(.)(y)@(mail.)utoronto.ca, where everything in a bracket is optional.
		let email_re = /^[a-z]+\.?[a-z]*@(mail\.)?utoronto\.ca$/;
		const valid_email = email_re.test(email);
		// Password, This is regex for at least 8 characters, 1 capital letter and 1 number.
		let pass_re = /^(?! )(?=.*\d)(?=.*[A-Z]).{8,}(?<! )$/;
		const valid_password = pass_re.test(password);
		if (valid_name && valid_email && valid_password) {
			this.setState({
				error: false,
				Name: name,
				Email: email,
				bio: this.state.bio.trim(),
			});
			return 0;
		} else {
			this.setState({ error: true });
			if (!valid_name) {
				this.setState({
					errorMsg:
						"Invalid Name... it should be in the form 'FIRST' ('MIDDLE' )'LAST', where things in () is optional.",
				});
			} else if (!valid_email) {
				this.setState({
					errorMsg:
						"Invalid Email... it should be in the form 'FIRST'(.'LAST')@(mail.)utoronto.ca",
				});
			} else {
				this.setState({
					errorMsg:
						"Invalid Password... it should be at least 8 characters and contain no leading/trailing spaces and at least 1 digit, 1 capital letter.",
				});
			}

			return 1;
		}
	}

	formEvent = ({ target }) => {
		this.setState({
			[target.name]: target.value,
		});
	};

	render() {
		return (
			<div>
				<Link to="/">
					<img id="logo" src={logo} width={128} alt="Logo" />
				</Link>
				<center>
					<h1 className="form-title">Create your profile</h1>
					<pre> {this.state.error ? this.state.errorMsg : ""}</pre>
				</center>

				{this.state.stage === 1 ? (
					<div>
						<div className="form-container">
							<div className="PLACEHOLDER-img">
								FEATURE COMING SOON
							</div>
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

						<div className="bio-container">
							<label> Bio </label>
							<textarea
								value={this.state.bio}
								onChange={this.handleBio}
							/>
						</div>

						<br />
						<br />
						<br />
						<br />
					</div>
				) : (
					<div className="select-wrapper">
						<div>
							<p className="select-header"> Hobbies </p>
							<Select
								isMulti
								className="select-container"
								options={options.hobbies}
								value={this.state.hobbies}
								onChange={this.handleOnSelectHobbies}
							/>
						</div>
						<div>
							<p className="select-header"> Courses </p>
							<Select
								isMulti
								className="select-container"
								options={options.courses}
								value={this.state.courses}
								onChange={this.handleOnSelectCourses}
							/>
						</div>
					</div>
				)}
				<Link
					to={this.state.nextPage}
					className="btn primary md form-submit"
					onClick={this.handleOnNext}
				>
					{this.state.stage === 1 ? "Next" : "Sign Up"}
				</Link>
			</div>
		);
	}
}

SignUpPage.propTypes = {
	registerUser: PropTypes.func.isRequired,
	user: PropTypes.object,
	authenticated: PropTypes.object,
	msg: PropTypes.object,
};

// This is the user state from the reducer.
const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error,
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter.
export default connect(mapStateToProps, { registerUser })(SignUpPage);
