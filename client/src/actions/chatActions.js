import axios from '../axios';
import { GET_CHATS} from './types';


// const getChatSuccess = (chats) => ({
// 	type: GET_CHATS,
// 	payload: chats,
// });



export const getChats = (id) => async (dispatch) => {
    // dispatch(getChatStart());
    // This makes a GET request to our api route
    await axios
    .get(`/api/messages/get_chat/${id}`)
    .then((res) => {
        dispatch({
            type: GET_CHATS,
            payload: res.data, 
        });
    }      
    );      
};


export const createChat = (chat) => async (dispatch) => {
    // dispatch(getChatStart());
    // This makes a GET request to our api route
    await axios
    .post(`/api/messages/new_chat`, chat)
    .then((res) => {
        dispatch({
            type: GET_CHATS,
            payload: res.data, 
        });
    }      
    );      
};
    


