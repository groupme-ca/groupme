import React from "react";
import { Link } from "react-router-dom";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
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
//added these 2 actions to refresh the chat page
import { startSwitch, endSwitch } from "../actions/messageActions";

import MyVerticallyCenteredModal from './FriendsModal';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: this.props.activePage,
			notifOpen: false,
			showFriendModal: false,
		};

		this.clickHandler.bind(this);
	}

	handleOnLogout = (e) => {
		// Logout the user
		this.props.logoutUser();
	};

	clickHandler(id) { 
		this.setState({activePage: id});
		this.props.startSwitch();
		this.props.endSwitch();
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

				<MyVerticallyCenteredModal 
					show={this.state.showFriendModal}
        			onHide={() => this.setState({ showFriendModal: false})}
				/>

				<div className="sidebar-head">
					<Link to="/">
						<img src={logo} width={56} />
					</Link>

					<div className="sidebar-tab">
						<SettingsIcon className="sidebar-img" />
					</div>
					<div className="sidebar-tab">
						<SupervisedUserCircleIcon
							className="sidebar-img"
							onClick={(e) => {
								this.setState({
									showFriendModal: true
								})
							}}
							style={{
								color: this.state.notifOpen ? "#333" : "",
							}}
						/>
					</div>
				</div>
				<div className="sidebar-content">
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
					<div className="sidebar-header"> 
						Rooms
						<AddIcon className='add-icon'/> 
					
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
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter.
export default connect(mapStateToProps, { startSwitch, endSwitch, logoutUser })(
	Sidebar
);

Sidebar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
};
