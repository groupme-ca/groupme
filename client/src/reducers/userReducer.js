// This is where the state is going to go, and where actions go
// This allows us to hookup to the backend and get data from mongo.
import {
	GET_USERS,
	DELETE_USER,
	UPDATE_USER,
	USERS_LOADING,
} from "../actions/types";
// Add the users array here.
const initialState = {
	users: [],
	loading: false,
	msg: {},
	error: null,
};

// DONT FIX THIS LINTING ERROR, IT FUCKS IT UP
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload,
				loading: false,
			};
		// case FIND_USER:
		// 	return {
		// 	};
		case DELETE_USER:
			return {
				...state,
				users: state.users.filter(
					(user) => user._id !== action.payload
				),
			};
		case UPDATE_USER:
			return {
				...state,
				users: [action.payload, ...state.users],
			};
		case USERS_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
