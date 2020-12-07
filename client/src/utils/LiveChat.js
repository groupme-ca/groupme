import React from "react";
import Pusher from "pusher-js";
import { newMessage } from "../actions/messageActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { startSwitch, endSwitch } from "../actions/messageActions";
import { getChats, chatEndSwitch, chatStartSwitch} from '../actions/chatActions';
import { getUsers } from '../actions/userActions';
import {loadUser } from '../actions/authActions'

const LiveChat = (state) => {
	// TODO: figure out how to unscubscribe later
	const [cid, setCid] = useState([]);
	const [me, setMe] = useState(null)
	const [pusher, setPusher] = useState({});

	useEffect(() => {
		setPusher(
			new Pusher("d386d4bf8093a108cca2", {
				cluster: "us2",
			})
		);
	}, []);

	useEffect(() => {
		var channel;
		if(state.auth.user !== null){
			setTimeout(() => {
				if (me === null){
					if (pusher.subscribe) {
						channel = pusher.subscribe(state.auth.user._id);
						setMe(state.auth.user);
						// console.log('me', state.auth.user, 'channel', channel);
						channel.bind("new_chat",async (data) => {
							console.log(data, 'data');
							state.getChats(data._id);
							state.getUsers();
							await state.loadUser();
							if (state.messages.loading === false) {
								state.chatStartSwitch();
							} else {
								state.chatEndSwitch();
							};
						});
					}
				}
			}, 2000)
		}
		
	}, [state.auth, pusher])

	useEffect(() => {
		var channel;		
		if (state.auth.user !== null) {
			state.auth.user.ChatIds.forEach((id) => {
				if (!(cid.includes(id))) {
					setTimeout(() => {
						if (pusher.subscribe) {
							channel = pusher.subscribe(id);
						} else return;
						channel.bind("inserted", (data) => {
							state.newMessage(data);
							if (state.messages.loading === false) {
								state.startSwitch();
							} else {
								state.endSwitch();
							};
						});
						setCid([...cid, id]);
					}, 2000);	
				};
			});
		}
	}, [state.chats]);

	return null;
};

// This is the current state in the store.
const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user,
	error: state.error,
	chats: state.chats,
	messages: state.messages
});

export default connect(mapStateToProps, {startSwitch, endSwitch, newMessage, getUsers, loadUser, getChats, chatEndSwitch, chatStartSwitch })(LiveChat);

