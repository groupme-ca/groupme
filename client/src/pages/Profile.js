import React from "react";
import Select from "react-select";
import options from "../utils/SignUpOptions";

import "./Recommendations.css";
import SideBar from "../components/SideBar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Profile.css";

const formFields = ["Name"];

class ProfilePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newPassword: "",
			user: this.props.auth.user,
			changePassword: false,
		};
	}
	componentDidMount() {
		this.setState({ user: this.props.auth.user });
		console.log(
			this.props.auth.user,
			this.props.auth,
			this.state
		)
	}

	formEvent = ({ target }) => {
		this.setState({
			[target.name]: target.value,
		});
	};

	saveState = () => {
		this.setState({
			changePassword: false,
		});
	};

	handleChangeName = (event) => {
		// this.setState({ bio: event.target.value });
		/*
        Okay, so basically we need to update, let me try something, if this works, it wil be easy to update. 
        Basically I'm gonna store the user in this state as an object, and edit that object
        Then we can send that user object into the put request
        And fingers crossed, it should work!!!
        :)
        exactly LOL, lets see if it works 
        I'm dumb i forgot to add the event handler!!!!
        */
		const user = this.state.user;
		user.name = event.target.value;
		this.setState({ user: user });
		// Here we're gonna make the request

		console.log(this.state.user);
	};
	handleChangeBio = (event) => {
		// this.setState({ bio: event.target.value });
		// Construct the modified user object
		const user = this.state.user;
		user.bio = event.target.value;
		this.setState({ user: user });
	};
	handleOnSelectHobbies = (selectedOptions) => {
		// Construct the modified user object
		const user = this.state.user;
		user.hobbies = selectedOptions;
		this.setState({ user: user });
	};

	handleOnSelectCourses = (selectedOptions) => {
		// this.setState({ courses: selectedOptions });
		// Construct the modified user object
		const user = this.state.user;
		user.courses = selectedOptions;
		this.setState({ user: user });
	};

	render() {
		return (
			<div className="page-container">
				<SideBar activePage="profile" />
				<div className="page-content">
					<h1 className="page-title">User Profile</h1>
					<div>
						<div className="form-container">
							<div class="container">
								<img
									class="card-img-top card-profile-pic"
									src="/static/media/vlad.58e00b26.jpg"
									height="128"
								></img>
								<div class="edit-img-overlay">Edit</div>
							</div>
							<div className="form-fields">
								{formFields.map((field) => (
									<div className="form-row">
										<label> {field} </label>
										{/* This hooks up the form to the state variable
                                                also, if it's a password field it gives it the type password*/}
										<input
											name={field}
											// onChange={this.handleChangeName}
											onBlur={this.handleChangeName}
											className="profile-info-field rw-field"
											defaultValue={
												// this.props.auth.user.name
												this.state.user.name
											}
										/>
									</div>
								))}
								<div className="form-row">
									<label> Email </label>
									<input
										readOnly
										name="Email"
										className="profile-info-field ro-field"
										defaultValue={
											// this.props.auth.user.email
											this.state.user.email
										}
										onChange={this.formEvent}
									/>
								</div>
								<div className="form-row">
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
												className="change-password"
												onClick={() => {
													this.setState({
														changePassword: true,
													});
												}}
											>
												Change password
											</a>
										</>
									)}
								</div>
								<div
									className={
										this.state.newPassword.length > 0 &&
										this.state.changePassword
											? "form-row"
											: "form-row hide"
									}
									name="confirmPasswordDiv"
								>
									<label> Confirm Password </label>
									<input
										type="password"
										name="oldPassword"
										onChange={this.formEvent}
										onKeyPress={(e) => {
											if (e.key === "Enter") {
												this.saveState();
											}
										}}
									/>
								</div>
							</div>
						</div>

						<div className="bio-container">
							<label> Bio </label>
							<textarea
								className="profile-info-field"
								defaultValue={
									// this.props.auth.user.bio
									this.state.user.bio
								}
							/>
						</div>

						<div className="filter-section margin-left">
							<div>
								<p className="select-header"> Hobbies </p>
								<Select
									isMulti
									className="filter-container"
									options={options.hobbies}
									value={
										// this.props.auth.user.hobbies
										this.state.user.hobbies
									}
									onChange={this.handleOnSelectHobbies}
								/>
							</div>
							<div>
								<p className="select-header"> Courses </p>
								<Select
									isMulti
									className="filter-container"
									options={options.courses}
									value={
										// this.props.auth.user.courses
										this.state.user.courses
									}
									onChange={this.handleOnSelectCourses}
								/>
							</div>
						</div>
						<br />
						<br />
						<br />
						<br />
					</div>
				</div>
			</div>
		);
	}
}

ProfilePage.propTypes = {
	user: PropTypes.object,
};

// This is the current state in the store.
const mapStateToProps = (state) => ({
	auth: state.auth,
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter.
export default connect(mapStateToProps)(ProfilePage);
