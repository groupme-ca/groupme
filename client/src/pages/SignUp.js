import React from "react";
import { Link, Redirect } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import options from "../utils/SignUpOptions";
import logo from "../assets/img/logo.svg";

// The following imports are for redux
// This connects the frontend to backend.
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import PropTypes from "prop-types";
import bgImage from "../assets/img/blob_right_bottom_1.png";

const formFields = ["Name", "Email", "Password"];

class SignUpPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: 1,
			error: false,
			errState: "",
			Name: "",
			Password: "",
			Email: "",
			bio: "",
			hobbies: [],
			courses: [],

			NameError: false,
			MailError: false,
			PasswordError: false,
			loading: false,
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

	handleOnNext = async (e) => {
		this.setState({ loading: true });

		if (this.state.stage === 1 && this.authenticate()) {
			this.setState({
				loading: false,
				stage: 2,
				// nextPage: "/welcome",
			});
		} else if (this.state.stage === 2) {
			if (!(this.state.hobbies.length && this.state.courses.length)) {
				this.setState({
					loading: false,
				});
				return;
			}
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
			await this.props.registerUser(newUser);
			this.setState({
				loading: false,
				stage: 3,
			});
		}
	};

	authenticate() {
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
			return 1;
		} else {
			if (!valid_name) this.setState({ NameError: true });
			else this.setState({ NameError: false });

			if (!valid_email) this.setState({ MailError: true });
			else this.setState({ MailError: false });

			if (!valid_password) this.setState({ PasswordError: true });
			else this.setState({ PasswordError: false });

			this.setState({
				error:
					this.state.PasswordError ||
					this.state.MailError ||
					this.state.NameError,
			});

			return 0;
		}
	}

	formEvent = ({ target }) => {
		this.setState({
			[target.name]: target.value,
		});
	};

	printErrorMsg(field) {
		if (field === "Name" && this.state.NameError) {
			return <div className="onboarding-err">Invalid name</div>;
		}

		if (field === "Email" && this.state.MailError) {
			return (
				<div className="onboarding-err">
					Please enter a valid UTORmail
				</div>
			);
		}

		if (field === "Password" && this.state.PasswordError) {
			return (
				<div className="onboarding-err">
					Please enter a secure password
				</div>
			);
		}

		return null;
	}

	render() {
		let SignUpLink = <div className="loading-wheel" />;
		if (this.state.loading) {
			SignUpLink = <div className="loading-wheel" />;
		} else if (
			this.state.stage !== 3 ||
			!this.props.auth.authenticated ||
			!this.props.auth.user
		) {
			SignUpLink = (
				<Link
					to={this.state.nextPage}
					className="btn primary md form-submit"
					onClick={this.handleOnNext}
				>
					{this.state.stage === 1 ? "Next" : "Sign Up"}
				</Link>
			);
		} else if (
			this.props.auth.user &&
			this.props.auth.authenticated &&
			this.state.stage === 3
		) {
			SignUpLink = <Redirect to={"/welcome"} />;
		}

		return (
			<div>
				<Link to="/">
					<img id="logo" src={logo} width={128} alt="Logo" />
				</Link>
				<center>
					<h1 className="form-title">Create your profile</h1>
				</center>
				{this.state.stage === 1 ? (
					<div style={{ height: "70vh" }}>
						<img
							src={bgImage}
							className="onboarding-bg sign-up-bg"
						/>
						<div className="form-container">
							<div className="form-fields">
								{formFields.map((field) => (
									<div className="form-row">
										<label> {field} </label>
										<input
											type={
												field === "Password"
													? "password"
													: ""
											}
											style={{
												border: `1px solid ${
													this.printErrorMsg(field)
														? "red"
														: "#afafaf"
												}`,
												outline: "none",
											}}
											name={field}
											onChange={this.formEvent}
											onKeyPress={(e) => {
												if (e.key === "Enter") {
													this.handleOnNext();
												}
											}}
										/>
										<div>{this.printErrorMsg(field)}</div>
									</div>
								))}
							</div>

							<div className="upload-img">
								{"Upload a profile picture \n (Coming Soon)"}
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
							<CreatableSelect
								isMulti
								className="select-container"
								options={options.hobbies}
								value={this.state.hobbies}
								onChange={this.handleOnSelectHobbies}
								formatCreateLabel={(s) => s}
							/>
						</div>
						<div>
							<p className="select-header"> Courses </p>
							<CreatableSelect
								isMulti
								className="select-container"
								options={options.courses}
								value={this.state.courses}
								onChange={this.handleOnSelectCourses}
								formatCreateLabel={(s) => s}
							/>
						</div>
					</div>
				)}
				{SignUpLink}
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
