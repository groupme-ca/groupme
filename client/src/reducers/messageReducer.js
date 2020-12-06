// This is where the state is going to go, and where actions go
// This allows us to hookup to the backend and get data from mongo.
import {
	NEW_MESSAGE,
	START_SWITCH,
	END_SWITCH,
	LOGOUT,
} from "../actions/types";
// Add the users array here.
const initialState = {
	messages: [],
	loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	switch (action.type) {
		case NEW_MESSAGE:
			return {
				...state,
				messages: [...state.messages, action.payload]
					.filter((msg) => msg._id !== action.payload._id)
					.concat([action.payload]),
				loading: false,
			};
		case START_SWITCH:
			return {
				...state,
				loading: true,
			};
		case END_SWITCH:
			return {
				...state,
				loading: false,
			};
		case LOGOUT:
			return {
				...state,
				messages: [],
				loading: false,
			};
		default:
			return state;
	}
}
