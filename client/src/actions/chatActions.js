import axios from '../axios';
import { GET_CHATS } from './types';

export const getChats = (id) => dispatch => {
    dispatch(setItemsLoading());
    // This makes a GET request to our api route. 
    axios
        .get(`/api/messages/${id}`)
        .then(res => 
            dispatch({
                type: GET_CHATS, 
                payload: res.data
            }));
};