import React from "react";
import Pusher from "pusher-js";
import { newMessage } from "../actions/messageActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { startSwitch, endSwitch } from "../actions/messageActions";


const LiveChat = (state) => {
	// TODO: figure out how to unscubscribe later
	const [cid, setCid] = useState([]);
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
		if (state.auth.user !== null) {
			state.auth.user.ChatIds.forEach((id) => {
				if (!(cid.includes(id))) {
					console.log(id, 'inside');
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
	error: state.error,
	chats: state.chats,
	messages: state.messages
});

export default connect(mapStateToProps, {startSwitch, endSwitch, newMessage })(LiveChat);

