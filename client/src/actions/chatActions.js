import axios from '../axios';
import { GET_CHATS } from './types';


// const getChatSuccess = (chats) => ({
// 	type: GET_CHATS,
// 	payload: chats,
// });

// const getChatStart = () => ({
// 	type: CHAT_START,
// });

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
