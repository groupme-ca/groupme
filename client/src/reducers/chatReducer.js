// This is where the state is going to go, and where actions go 
// This allows us to hookup to the backend and get data from mongo. 
import { GET_CHATS } from '../actions/types';
// Add the users array here. 
const initialState = {
    chats: [],
    loading: false
}


export default function(state = initialState, action){
    switch (action.type){
        case GET_CHATS:
            return {
                ...state, 
                chats: [ ...state.chats, action.payload], 
                loading: false
            };
        default: 
            return state;
    }
}