import axios from "axios";
import { NEW_MESSAGE, SEND_MESSAGE, START_SWITCH, END_SWITCH } from "./types";

export const newMessage = (msg) => (dispatch) => {
	dispatch({
		type: NEW_MESSAGE,
		payload: msg,
	});
};

export const startSwitch = () => {
	return {
		type: START_SWITCH,
	};
};
export const endSwitch = () => {
	return {
		type: END_SWITCH,
	};
};

export const sendMessage = (msg) => (dispatch) => {
	// dispatch(getChatStart());
	// This makes a GET request to our api route
	axios.put(`/api/messages/new_msg`, msg).then((res) =>
		dispatch({
			type: SEND_MESSAGE,
		})
	);
};

export const getMessages = (id) => (dispatch) => {
	// dispatch(getChatStart());
	// This makes a GET request to our api route
	axios.get(`/api/messages/${id}`).then((res) => {
		res.data.forEach((msg) => {
			dispatch({
				type: NEW_MESSAGE,
				payload: msg,
			});
		});
	});
};
