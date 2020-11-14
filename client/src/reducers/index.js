<<<<<<< HEAD
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

// If we want to add more reducers, do so below.
export default combineReducers({
	user: userReducer,
	auth: authReducer,
	error: errorReducer,
});
=======
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

// If we want to add more reducers, do so below.
export default combineReducers({
    user: userReducer,
    chats: chatReducer
})
>>>>>>> 139767c (completed chat front end, changed pusher channel from chat-channel to id of the particpants)
