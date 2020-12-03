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
import HomeIcon from '@material-ui/icons/Home';
import "./SideBar.css";
import logo from "../assets/img/logo.svg";
//added these 2 actions to refresh the chat page
import { startSwitch, endSwitch } from "../actions/messageActions";
import CreateGroupModal from "../components/CreateGroupModal";


class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: this.props.activePage,
			notifOpen: false,
			showCreateGroupModal: false
		};
		this.clickHandler.bind(this);
	}

	handleOnLogout = (e) => {
		// Logout the user
		this.props.logoutUser();
	};

	clickHandler(id) { 
		this.setState({activePage: id});
		if (this.props.messages.loading === false) {
			this.props.startSwitch();
		} else {
			this.props.endSwitch();
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
						<MenuIcon className="sidebar-img" />
					</div>
				</div>
				
				<div className="sidebar-head">
					<Link to="/">
						<img src={logo} width={56} />
					</Link>

					<div className="sidebar-tab">
						<SettingsIcon className="sidebar-img" />
					</div>
					<div className="sidebar-tab">
						<NotificationsIcon
							className="sidebar-img"
							style={{
								color: this.state.notifOpen ? "#333" : "",
							}}
						/>
					</div>
				</div>
				<div className="sidebar-content">

					<Link to="/home">
						<div className="sidebar-tab">
							<HomeIcon className="sidebar-img" />
							<div
								style={{
									fontWeight:
										this.state.activePage === "home"
											? "700"
											: "400",
									color:
										this.state.activePage === "home"
											? "#333"
											: "",
								}}
							>
								Home
							</div>
						</div>
					</Link>

					<Link to="/profile">
						<div className="sidebar-tab">
							<AccountCircleIcon className="sidebar-img" />
							<div
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
							</div>
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
							<> Search </>
						</div>
					</Link>

					<Link to="/" onClick={this.handleOnLogout}>
						<div className="sidebar-tab">
							<PowerSettingsNewIcon className="sidebar-img" />
							<> Sign out </>
						</div>
					</Link>
					<CreateGroupModal
							show={this.state.showCreateGroupModal}
						onHide={() => this.setState({ showCreateGroupModal: false})}
						/>
					
					<div className="sidebar-header"> 
						Rooms
						<AddIcon className='add-icon' onClick={(e) => {
							console.log("test");
							this.setState({showCreateGroupModal: true});
						}} /> 
					
					
					</div>
					<div className="chat-div">
					
						{this.props.chats.chat.map((cht) => {
							if (cht.name !== "") {
								return (
									<Link
										to={`/chat/${cht._id}`}
										onClick={(id) => this.clickHandler(cht._id)}
									>
										<div>
											<div className="sidebar-tab">
												<a 
													style={{color: cht._id === this.state.activePage ?  "#222" : "",
															fontWeight:	this.state.activePage === cht._id ? "700" : "400",
													}}> {cht.name} </a>
											</div>
										</div>
									</Link>
								);
							}
						})}
					</div>
				

					<div className="sidebar-header"> 
						Messages 
						<AddIcon className='add-icon'/> 
					</div>
					<div className="chat-div">
						{this.props.chats.chat.map((cht) => {
							if (cht.name === "") {
								return (
									<Link
										to={`/chat/${cht._id}`}
										onClick={(id) => this.clickHandler(cht._id)}
									>
										<div>
											<div className="sidebar-tab">
												<a style={{color: cht._id === this.state.activePage ?  "#222" : "",
															fontWeight:	this.state.activePage === cht._id ? "700" : "400",
													}}>
													{" "}
													{cht.participants[0].name ===
													this.props.auth.user.name
														? cht.participants[1].name
														: cht.participants[0]
																.name}{" "}
												</a>
											</div>
										</div>
									</Link>
								);
							}
						})}
					</div>
				</div>
			</div>
		);
	}
}

// This is the current state in the store.
const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error,
	chats: state.chats,
	messages: state.messages
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter.
export default connect(mapStateToProps, { startSwitch, endSwitch, logoutUser })(
	Sidebar
);

Sidebar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
};
