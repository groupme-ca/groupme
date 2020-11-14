import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

// If we want to add more reducers, do so below.
export default combineReducers({
    user: userReducer,
    chats: chatReducer
})