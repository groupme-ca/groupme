import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFriend } from "../actions/friendActions";

import "./UserCard.css";

class UserCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			requestSent: false,
			profileView: false,
		};
	}
	/**
	 * Send a friend request from the current user to the user of this UserCard.
	 * @param friendId The friend to add.
	 */
	handleOnAddFriend = (e) => {
		const reqSent = this.props.addFriend(
			this.props.auth.user._id,
			this.props.id
		);
		if (!reqSent) {
			// If we want to popup an error, we can do it here.
			this.setState({
				requestSent: false,
			});
			return;
		}
		this.setState({
			requestSent: true,
		});
	};

	componentDidMount(props) {
		const { profileView } = this.state;
		if (profileView) {
			this.setState({
				profileView: false,
			});
		}
		try {
			let userFriends = this.props.auth.user.friends;
			let userFRSent = this.props.auth.user.friendRequestsSent;
			// Check if this friend Id is already a friend of the user or that the request has been sent

			let i;
			// If this card is already a friend, then set the requestSent to be true.
			for (i = 0; i < userFriends.length; i++) {
				if (userFriends[i].id === this.props.id) {
					this.setState({
						requestSent: true,
					});
					break;
				}
			}
			if (this.state.requestSent) {
				return;
			}
			// If this card has already been sent a request, set the requeseSent to be true.
			for (i = 0; i < userFRSent.length; i++) {
				if (userFRSent[i].id === this.props.id) {
					this.setState({
						requestSent: true,
					});
					break;
				}
			}
		} catch (err) {
			console.log(err);
		}
	}

	format_rScoreStyling() {
		if (this.props.rScore > 80) {
			return "card-hobby matching-score great";
		} else if (this.props.rScore > 65) {
			return "card-hobby matching-score good";
		} else return "card-hobby matching-score fair";
	}

	format_rScoreMsg() {
		if (this.props.rScore > 80) {
			return "Great match!";
		} else if (this.props.rScore > 65) {
			return "Good match!";
		} else return "Fair match";
	}

	showModal() {
		this.props.showProfileModal(
			this.props.avatar,
			this.props.title,
			this.props.courses,
			this.props.hobbies,
			this.props.bio
		);
	}

	render() {
		return (
			<Card className="user-card-container">
				<Card.Img
					variant="top"
					src={this.props.avatar}
					height={128}
					className="card-profile-pic"
					onClick={() => {
						this.showModal();
					}}
				/>

				<Card.Body
					className="card-body"
					onClick={() => {
						this.showModal();
					}}
				>
					<Card.Title className="card-title">
						{this.props.title}
					</Card.Title>
					<Card.Text className="card-bio">
						{this.props.bio.length < 48
							? this.props.bio
							: this.props.bio.slice(0, 45) + "..."}
					</Card.Text>

					<div className="hobbies-field">
						<div className={this.format_rScoreStyling()}>
							{this.format_rScoreMsg()}
						</div>
						{this.props.tags.map((h, idx) => (
							<div key={idx} className="card-hobby">
								{" "}
								{h}{" "}
							</div>
						))}
					</div>
				</Card.Body>

				{
					<div className="card-buttons">
						{this.state.requestSent ? (
							<p className="friend-notif"> Request sent! </p>
						) : (
							<div
								className="btn secondary xs"
								onClick={this.handleOnAddFriend}
								// onClick={(e) => {
								// 	console.log(this.props.id);
								// 	this.setState({
								// 		requestSent: true,
								// 	});
								// }}
							>
								Add friend
							</div>
						)}
					</div>
				}
			</Card>
		);
	}
}

UserCard.propTypes = {
	addFriend: PropTypes.func.isRequired,
	auth: PropTypes.object,
	error: PropTypes.object,
};

// This is the current state in the store.
const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error,
});

export default connect(mapStateToProps, { addFriend })(UserCard);
