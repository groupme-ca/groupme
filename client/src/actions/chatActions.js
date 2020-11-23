import axios from '../axios';
import { GET_CHATS, START_SWITCH, END_SWITCH } from './types';


// const getChatSuccess = (chats) => ({
// 	type: GET_CHATS,
// 	payload: chats,
// });

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

export const getChats = (id) => (dispatch) => {
    // dispatch(getChatStart());
    // This makes a GET request to our api route
    axios
    .get(`/api/messages/${id}`)
    .then((res) => 
        dispatch({
            type: GET_CHATS,
            payload: res.data, 
        })
    );      
};
    
    
export const sendMessage = (chat) => (dispatch) => {
    // dispatch(getChatStart());
    // This makes a GET request to our api route
    axios
    .put(`/api/messages/${chat._id}`, chat)
    .then((res) => 
        dispatch({
            type: GET_CHATS,
            payload: res.data, 
        })
    ); 
    
            // (res) = {
            // console.log("1");
            // dispatch(getChatSuccess(res.data));
    //      }  
                  
};
