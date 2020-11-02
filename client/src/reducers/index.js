import { combineReducers } from 'redux';
import userReducer from './userReducer';

// If we want to add more reducers, do so below.
export default combineReducers({
    user: userReducer
})