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
