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
					channel = pusher.subscribe(id);
					channel.bind("inserted", (data) => {
						state.newMessage(data);
						if (state.messages.loading === false) {
							state.startSwitch();
						} else {
							state.endSwitch();
						};
					});
					setCid([...cid, id]);
				};
			});
			// console.log(newChannel, 'newchannel');
			// channels.forEach(ch =>{
			// 	ch.unbind_all();
			// 	ch.unsubscribe();
			// })
			// console.log("channel", channels);
			// setChannels(newChannel);
			// console.log("new", newChannel);


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
	messages: state.messages
});

export default connect(mapStateToProps, {startSwitch, endSwitch, newMessage })(LiveChat);

