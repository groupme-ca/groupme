import axios from "../axios";
import { GET_CHATS, CHAT_END_SWITCH, CHAT_START_SWITCH } from "./types";

// const getChatSuccess = (chats) => ({
// 	type: GET_CHATS,
// 	payload: chats,
// });

export const chatStartSwitch = () => {
	return {
		type: CHAT_START_SWITCH,
	};
};
export const chatEndSwitch = () => {
	return {
		type: CHAT_END_SWITCH,
	};
};
export const getChats = (id) => async (dispatch) => {
	// dispatch(getChatStart());
	// This makes a GET request to our api route
	await axios.get(`/api/messages/get_chat/${id}`).then((res) => {
		dispatch({
			type: GET_CHATS,
			payload: res.data,
		});
	});
};

export const createChat = (chat, participants) => async (dispatch) => {
	// dispatch(getChatStart());
	// This makes a GET request to our api route
	await axios.post(`/api/messages/new_chat`, chat).then((res) => {
		dispatch({
			type: GET_CHATS,
			payload: res.data,
		});
		const l = participants.length;
		var cids = [];
		var i = 0;
		for (i = 0; i < l; i++) {
			cids = participants[i].ChatIds.concat([res.data._id]);
			// if(i === l-1){
			//     axios.put(`/api/users/${participants[i].id}`, {ChatIds: cids}).then(
			//         axios.get("/api/users").then((res3) =>

			//             dispatch({
			//                 type: GET_USERS,
			//                 payload: res3.data,
			//             }))
			//         );
			// }else{
			axios.put(`/api/users/${participants[i].id}`, { ChatIds: cids });
			// };
		}
	});
};
