import React from "react";
import { Link } from "react-router-dom";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";

import "./SideBar.css";
import logo from "../assets/img/logo.svg";

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: this.props.activePage,
			notifOpen: false,
			rooms: ["fakeRoom"],
			chats: ["Alick Professorson"],
		};
	}

	handleOnLogout = (e) => {
		// Logout the user
		this.props.logoutUser();
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
					<Link to="/">
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
					<div>
						{this.state.rooms.map((room) => (
							<div className="sidebar-tab">
								<a> {room} </a>
							</div>
						))}
					</div>

					<div className="sidebar-header"> Messages </div>
					<div>
						{this.state.chats.map((chat) => (
							<div className="sidebar-tab">
								<a> {chat} </a>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

Sidebar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
};

// This is the current state in the store.
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { logoutUser })(Sidebar);
