import axios from "axios";
import { GET_CHATS, START_SWITCH, END_SWITCH } from "./types";

// const getChatSuccess = (chats) => ({
// 	type: GET_CHATS,
// 	payload: chats,
// });

export const getChats = (id) => (dispatch) => {
	// dispatch(getChatStart());
	// This makes a GET request to our api route
	axios.get(`/api/messages/get_chat/${id}`).then((res) => {
		dispatch({
			type: GET_CHATS,
			payload: res.data,
		});
	});
};
