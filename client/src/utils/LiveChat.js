import React from "react";
import Pusher from "pusher-js";
import { getChats } from "../actions/chatActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

const LiveChat = (state) => {
	// TODO: figure out how to unscubscribe later
	const [channels, setChannels] = useState([]);
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
		const newChannel = [];
		if (state.auth.user !== null) {
			state.auth.user.ChatIds.forEach((id) => {
				channel = pusher.subscribe(id);
				newChannel.push(channel);
				channel.bind("updated", (data) => {
					state.getChats(data);
				});
			});
			// console.log(newChannel, 'newchannel');
			setChannels(newChannel);

			// console.log('channels', channels, channels.length);
		}
		// setChannels(["hello"]);
		// console.log(channels, 'final');
		// return() => {
		//     channels.forEach(channel => {
		//         channel.unbind_all();
		//         channel.unsubscribe();
		//     });
		// console.log(channels);
		// console.log("-");
		// console.log(channels);

		//};
	}, [state.chats]);

	return null;
};

// This is the current state in the store.
const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error,
	chats: state.chats,
});

export default connect(mapStateToProps, { getChats })(LiveChat);
