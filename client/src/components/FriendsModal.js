import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import frens from "../utils/UserCardUtils";

import "./FriendModal.css";
// import { useState } from "react";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { acceptRequest } from "../actions/friendActions";
import { createChat, chatEndSwitch, chatStartSwitch } from '../actions/chatActions';
import { getUsers } from '../actions/userActions';
import { loadUser } from '../actions/authActions';
import img_default from "../assets/img/default.png";
import CloseIcon from "@material-ui/icons/Close";
import BlockIcon from "@material-ui/icons/Block";
import CheckIcon from "@material-ui/icons/Check";

class MyVerticallyCenteredModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			friends: true,
			reqIncoming: false,
			reqPending: false,
		};
	}
	async handleOnAcceptRequest(friendId) {
		if (!this.props.auth.user) {
			return;
		}
		const success = await this.props.acceptRequest(
			this.props.auth.user._id,
			friendId
		);
		// This is for if we want to display errors in the future.
		if (success) {
			console.log("Accept Request successful");
			const me = this.props.auth.user;
			console.log(me, 'me')
			await this.props.getUsers();
			const frnd = Array.from(this.props.user.users).find(f => f._id === friendId); 
			//prt is a list of particiapants in the form of:
			// [{uid, name}]
			// prt is used to create the chat
			//updatedprt is a list of particiapants in the form of:
			// [{uid, chatids}]
			// updatedprt is used to update the users
			const prt =  [{uid: me._id, name: me.name}, {uid: frnd._id, name: frnd.name}];
			const updatedprt = [{id: me._id, ChatIds: me.ChatIds},
								{id: frnd._id, ChatIds: frnd.ChatIds}
								];
			const newChat = {
				name: "",
				participants: prt
			};
			console.log(prt, 'prt', updatedprt, 'updtepert');
			await this.props.createChat(newChat, updatedprt);
			this.props.getUsers();
			await this.props.loadUser();
			if(this.props.chats.loading === false){
				this.props.chatStartSwitch();
			} else{
				this.props.chatEndSwitch();
			}
			

		} else {
			console.log("Accept Request Unsuccessful");
		}
	}
	swapMode(mode) {
		if (mode === "friends") {
			this.setState({
				friends: true,
				reqIncoming: false,
				reqPending: false,
			});
		} else if (mode === "reqIncoming") {
			this.setState({
				friends: false,
				reqIncoming: true,
				reqPending: false,
			});
		} else if (mode === "reqPending") {
			this.setState({
				friends: false,
				reqIncoming: false,
				reqPending: true,
			});
		}
	}

	render() {
		const getSelectorStyling = (mode) => {
			if (mode === "friends") {
				return {
					color: `${this.state.friends ? "#ff914e" : "#333"}`,
					borderBottom: `${
						this.state.friends ? "2px solid #ff914e" : "none"
					}`,
					fontWeight: 700,
				};
			}

			if (mode === "reqIncoming") {
				return {
					color: `${this.state.reqIncoming ? "#ff914e" : "#333"}`,
					borderBottom: `${
						this.state.reqIncoming ? "2px solid #ff914e" : "none"
					}`,
					fontWeight: 700,
				};
			}

			if (mode === "reqPending") {
				return {
					color: `${this.state.reqPending ? "#ff914e" : "#333"}`,
					borderBottom: `${
						this.state.reqPending ? "2px solid #ff914e" : "none"
					}`,
					fontWeight: 700,
				};
			}
		};

		const renderSelectedList = () => {
			if (this.state.friends && this.props.auth.user) {
				return (
					<center>
						{this.props.auth.user.friends.map((f) => (
							<div className="friend-list-entry">
								<img
									src={f.avatar ? f.avatar : img_default}
									alt={f.name}
									height="48"
									width="48"
									className="friend-list-icon"
								/>

								<div className="friend-list-info">
									<div>
										{" "}
										<b> {f.name} </b>{" "}
									</div>
									<div> {f.bio} </div>
								</div>
							</div>
						))}
					</center>
				);
			} else if (this.state.reqIncoming && this.props.auth.user) {
				return (
					<center>
						{this.props.auth.user.friendRequestsRec.map((f) => (
							<div className="friend-list-entry">
								<img
									src={f.avatar ? f.avatar : img_default}
									alt={f.name}
									height="48"
									width="48"
									className="friend-list-icon"
								/>

								<div className="friend-list-info">
									<div>
										{" "}
										<b> {f.name} </b>{" "}
									</div>
									<div> {f.bio} </div>
								</div>

								<div
									className="friend-accept-btn"
									onClick={() =>
										this.handleOnAcceptRequest(f.id)
									}
								>
									{" "}
									<CheckIcon />{" "}
								</div>
								<div className="friend-cancel-btn">
									{" "}
									<BlockIcon />{" "}
								</div>
							</div>
						))}
					</center>
				);
			} else if (this.state.reqPending && this.props.auth.user) {
				return (
					<center>
						{this.props.auth.user.friendRequestsSent.map((f) => (
							<div className="friend-list-entry">
								<img
									src={f.avatar ? f.avatar : img_default}
									alt={f.name}
									height="48"
									width="48"
									className="friend-list-icon"
								/>

								<div className="friend-list-info">
									<div>
										{" "}
										<b> {f.name} </b>{" "}
									</div>
									<div> {f.bio} </div>
								</div>

								<div className="friend-cancel-btn">
									{" "}
									<BlockIcon />{" "}
								</div>
							</div>
						))}
					</center>
				);
			}
		};
		return (
			<div
				className="modal-bg"
				style={
					!this.props.show
						? { display: "none" }
						: { display: "block" }
				}
			>
				<Modal
					{...this.props}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					className="modal-container"
					centered
				>
					<Modal.Header className="friend-modal-head">
						<CloseIcon
							className="modal-close-btn"
							onClick={() => {
								this.props.onHide();
							}}
						/>
						<div className="modal-selectors">
							<div
								style={getSelectorStyling("friends")}
								onClick={() => {
									this.swapMode("friends");
								}}
							>
								Friends
							</div>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<div
								style={getSelectorStyling("reqIncoming")}
								onClick={() => {
									this.swapMode("reqIncoming");
								}}
							>
								Requests
							</div>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<div
								style={getSelectorStyling("reqPending")}
								onClick={() => {
									this.swapMode("reqPending");
								}}
							>
								Pending
							</div>
						</div>
					</Modal.Header>
					<Modal.Body className="list-body">
						{renderSelectedList()}
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

MyVerticallyCenteredModal.propTypes = {
	acceptRequest: PropTypes.func.isRequired,
	createChat: PropTypes.func.isRequired,
	getUsers: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
	chatEndSwitch: PropTypes.func.isRequired,
	chatStartSwitch: PropTypes.func.isRequired,
	auth: PropTypes.object,
	error: PropTypes.object,
	chats: PropTypes.object
};

// This is the current state in the store.
const mapStateToProps = (state) => ({
	auth: state.auth,
	chats: state.chats,
	user: state.user,
	error: state.error,
});

export default connect(mapStateToProps, { acceptRequest, createChat, getUsers, loadUser, chatEndSwitch, chatStartSwitch })(
	MyVerticallyCenteredModal
);
