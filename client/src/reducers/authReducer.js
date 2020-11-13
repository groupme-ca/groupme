import {
	USER_LOADING,
	USER_LOADED,
	REGISTER_START,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	AUTH_ERROR,
} from "../actions/types";
// Add the curent user and some errors/statuses
const initialState = {
	token: localStorage.getItem("token"),
	user: null,
	authenticated: false,
	loading: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	switch (action.type) {
		case USER_LOADING:
		case REGISTER_START:
		case LOGIN_START:
			return {
				...state,
				loading: true,
			};
		case USER_LOADED:
			return {
				...state,
				loading: false,
				authenticated: true,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				...action.payload,
				loading: false,
				authenticated: true,
			};
		case AUTH_ERROR:
		case REGISTER_FAILURE:
		case LOGIN_FAILURE:
		case LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				user: null,
				token: null,
				authenticated: false,
				loading: false,
			};

		default:
			return state;
	}
}
