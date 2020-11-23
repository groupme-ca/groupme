import React from "react";
import { Link } from "react-router-dom";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AddIcon from "@material-ui/icons/Add";

import "./SideBar.css";
import logo from "../assets/img/logo.svg";
import { connect } from "react-redux";
//added these 2 actions to refresh the chat page
import { startSwitch, endSwitch } from "../actions/chatActions"
import { logoutUser } from "../actions/authActions"

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: this.props.activePage,
			notifOpen: false,
			rooms: ["fakeRoom"],
			chats: ["Alick Professorson"],
		};
	};

	handleOnLogout = (e) => {
				// Logout the user
		this.props.logoutUser();
	};

	clickHandler() {
		this.props.startSwitch();
		this.props.endSwitch();
	};

	render() {
		return (
			<div className="sidebar">
				<div className="hamburger-wrapper">
					<div className="hamburger">
						<MenuIcon classname="sidebar-img" />
					</div>
				</div>
				<div className="sidebar-head">
					<Link to="/" >
						<img src={logo} width={56} />
					</Link>

					<div class="sidebar-tab">
						<SettingsIcon className="sidebar-img" />
					</div>
					<div class="sidebar-tab">
						<NotificationsIcon
							className="sidebar-img"
							style={{
								color: this.state.notifOpen ? "#333" : "",
							}}
						/>
					</div>
				</div>
				<div className="sidebar-content">
					<Link to="/profile">
						<div class="sidebar-tab">
							<AccountCircleIcon className="sidebar-img" />
							<a
								style={{
									fontWeight:
										this.state.activePage === "profile"
											? "700"
											: "400",
									color:
										this.state.activePage === "profile"
											? "#333"
											: "",
								}}
							>
								My Profile
							</a>
						</div>
					</Link>

					<Link to="/welcome">
						<div
							className="sidebar-tab"
							style={{
								fontWeight:
									this.state.activePage === "search"
										? "700"
										: "400",
								color:
									this.state.activePage === "search"
										? "#333"
										: "#888",
							}}
						>
							<SearchIcon className="sidebar-img" />
							<a>Search </a>
						</div>
					</Link>

					<Link to="/" onClick={this.handleOnLogout}>
						<div class="sidebar-tab">
							<PowerSettingsNewIcon className="sidebar-img" />
							<a> Sign out </a>
						</div>
					</Link>

					<div className="sidebar-header"> Rooms </div>
						{this.props.chats.chat.map((cht) => {
							if (cht.name !== '' ){
								return <Link to={`/chat/${cht._id}`} onClick={this.clickHandler.bind(this)}>
								<div>
									<div className="sidebar-tab">
										<a> {cht.name} </a>
									</div>
								</div>
								</Link>
							
						}})}

					<div className="sidebar-header"> Messages </div>
						{this.props.chats.chat.map((cht) => {
							if (cht.name === '' ){
								return <Link to={`/chat/${cht._id}`} onClick={this.clickHandler.bind(this)}>
								<div>
									<div className="sidebar-tab">
										<a> {cht.participants[0].name === this.props.auth.user.name ? cht.participants[1].name : cht.participants[0].name} </a>
									</div>
								</div>
								</Link>
							
						}})}
					
				</div>
			</div>
		);
	}
}


// This is the current state in the store.
const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error,
	chats: state.chats
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter.
export default connect(mapStateToProps, {startSwitch, endSwitch, logoutUser})(Sidebar);

