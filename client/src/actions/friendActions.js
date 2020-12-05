import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";
import {
	ADD_FRIEND_START,
	ADD_FRIEND_SUCCESS,
	ADD_FRIEND_FAILURE,
	ACCEPT_FRIEND_REQUEST_START,
	ACCEPT_FRIEND_REQUEST_SUCCESS,
	ACCEPT_FRIEND_REQUEST_FAILURE,
} from "./types";

import findUser from "./userActions";

// Start adding a friend.
const getAddFriendStart = () => ({
	type: ADD_FRIEND_START,
});

// Adding a friend was a failure.
const getAddFriendFailure = () => ({
	type: ADD_FRIEND_FAILURE,
});

// Adding a friend was a success.
const getAddFriendSuccess = (user) => ({
	type: ADD_FRIEND_SUCCESS,
	payload: user,
});

// Start accepting a request
const getAcceptRequestStart = () => ({
	type: ACCEPT_FRIEND_REQUEST_START,
});

// Accepting a request was a failure
const getAcceptRequestFailure = () => ({
	type: ACCEPT_FRIEND_REQUEST_FAILURE,
});

// Accepting a request was a success
const getAcceptRequestSuccess = (user) => ({
	type: ACCEPT_FRIEND_REQUEST_SUCCESS,
	payload: user,
});
/**
 * Send a Friend Request from id -> friendId
 * @param id The id of the user trying to add friendId
 * @param friendId The friend that is being added by the user.
 * @return 1 on success, 0 on failure.
 */
export const addFriend = (id, friendId) => async (dispatch) => {
	dispatch(getAddFriendStart());
	// Get each of the users and make sure they exist
	var sender;
	var receiver;

	sender = findUser(id, ADD_FRIEND_FAILURE);
	receiver = findUser(friendId, ADD_FRIEND_FAILURE);
	// If either the sender or receiver is not found, then return early indicating failure
	if (!sender || !receiver) {
		return 0;
	}
	// Modify the friend request arrays by adding the name and id of the respective user.
	const frSent = {
		friendRequestsSent: [
			...sender.friendRequestsSent,
			{
				id: receiver.id,
				name: receiver.name,
			},
		],
	};
	const frRec = {
		friendRequestsReceived: [
			...receiver.friendRequestsReceived,
			{
				id: sender.id,
				name: sender.name,
			},
		],
	};

	// Add the friendId to the sender's friend requests sent
	await axios
		.patch(`/api/users/${id}`, frSent)
		.then((usr) => {
			sender = usr;
		})
		.catch((err) => {
			dispatch(
				returnErrors(
					err.response.data,
					err.response.status,
					ADD_FRIEND_FAILURE
				)
			);
			return 0;
		});

	// Add the id to the receiver's friend requests received
	await axios.patch(`/api/users/${friendId}`, frRec).catch((err) => {
		dispatch(
			returnErrors(
				err.response.data,
				err.response.status,
				ADD_FRIEND_FAILURE
			)
		);
		return 0;
	});

	// If it reaches here that means we are successful
	dispatch(clearErrors());
	dispatch(getAddFriendSuccess(sender));
	return 1;
};

/**
 * Accepts a friend request which was sent by friendId to id.
 * @param id The user accepting the friend request from friendId
 * @param friendId The friendId of the user who sent the request.
 * @return 1 on success, 0 on failure
 */
export const acceptRequest = (id, friendId) => async (dispatch) => {
	dispatch(getAcceptRequestStart);
	var sender;
	var receiver;
	// Make sure both the users exist.
	receiver = findUser(id, ADD_FRIEND_FAILURE);
	sender = findUser(friendId, ADD_FRIEND_FAILURE);
	// If either the sender or receiver is not found, then return early indicating failure
	if (!sender || !receiver) {
		return 0;
	}
	// construct the receiver and sender for searching.
	const receiverInfo = {
		id: receiver.id,
		name: receiver.name,
	};

	const senderInfo = {
		id: sender.id,
		name: sender.name,
	};

	// Modify the friendRequests arrays
	let frSent = sender.friendRequestsSent;
	let frRec = receiver.friendRequestsReceived;
	let recIndex = frSent.findIndex(receiverInfo);
	let sendIndex = frRec.findIndex(senderInfo);

	// If either of the ids are not present, then return 0 for failure
	if (recIndex < 0 || sendIndex < 0) {
		dispatch(
			returnErrors(
				"The user's friend request does not exist",
				-1,
				ACCEPT_FRIEND_REQUEST_FAILURE
			)
		);

		return 0;
	}

	// Both ids exist, so remove them
	frSent.splice(recIndex, 1);
	frRec.splice(sendIndex, 1);

	// Add the friends to each other's friends lists.
	let friendsSender = sender.friends;
	let friendsReceiver = receiver.friends;

	// Assert that they are not already friends
	recIndex = friendsSender.findIndex(receiverInfo);
	sendIndex = friendsReceiver.findIndex(senderInfo);

	// If receiver is not in the sender's friends list
	if (recIndex < 0) {
		// Add the receiver to the sender's friend list
		friendsSender = [...friendsSender, receiverInfo];

		await axios
			.patch(`/api/users/${friendId}`, friendsSender)
			.catch((err) => {
				dispatch(
					returnErrors(
						err.response.data,
						err.response.status,
						ACCEPT_FRIEND_REQUEST_FAILURE
					)
				);
				return 0;
			});
	}

	// If the sender is not in the receiver's friends list
	if (sendIndex < 0) {
		// Add the receiver to the sender's friend list
		friendsReceiver = [...friendsReceiver, senderInfo];

		await axios
			.patch(`/api/users/${id}`, friendsReceiver)
			.then((usr) => {
				receiver = usr;
			})
			.catch((err) => {
				dispatch(
					returnErrors(
						err.response.data,
						err.response.status,
						ACCEPT_FRIEND_REQUEST_FAILURE
					)
				);
				return 0;
			});
	}
	// If it reaches here, then adding a friend was successful
	dispatch(clearErrors());
	dispatch(getAcceptRequestSuccess(receiver));
	return 1;
};
