// This is where the state is going to go, and where actions go 
// This allows us to hookup to the backend and get data from mongo. 
import { GET_CHATS, UPDATE_CHAT} from '../actions/types';
// Add the users array here. 
const initialState = {
    chat: [],
    loading: false
}


export default function(state = initialState, action){
    switch (action.type){
        case GET_CHATS:
            return {
                ...state, 
                chat: [action.payload, ...state.chat].filter(cht => cht._id !== action.payload._id).concat([action.payload]), 
                loading: false
            };
        // case UPDATE_CHAT:
        //     return {
        //         ...state,
        //         chat: [action.payload, ...state.chat].filter(cht => cht._id !== action.payload._id).concat([action.payload]), 
        //         loading: false
        //     };
        default: 
            return state;
    }
}