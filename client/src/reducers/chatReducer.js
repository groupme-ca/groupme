// This is where the state is going to go, and where actions go 
// This allows us to hookup to the backend and get data from mongo. 
import { GET_CHATS, END_SWITCH, START_SWITCH} from '../actions/types';
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
                chat: [...state.chat, action.payload].filter(cht => cht._id !== action.payload._id).concat([action.payload]), 
                loading: false
            };
        case START_SWITCH:
            return {
                ...state,
                loading: true
            };
        case END_SWITCH:
            return {
                ...state,
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