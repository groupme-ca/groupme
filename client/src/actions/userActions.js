import axios from "axios";
import { GET_USERS, UPDATE_USER, USERS_LOADING } from "../actions/types";
import { returnErrors } from "../actions/errorActions";

export const getUsers = () => async (dispatch) => {
	dispatch(setUsersLoading());
	// This makes a GET request to our api route.
	await axios.get("/api/users").then((res) =>
		dispatch({
			type: GET_USERS,
			payload: res.data,
		})
	);
};

/**
 * Tries to find a user by their id, returns the user if found, otherwise null.
 * @param id The id of the user to search for
 * @param errType The type of error to dispatch if the request is not successful
 */
export const findUser = (id, errType) => async (dispatch) => {
	await axios
		.get(`api/users/${id}`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			dispatch(
				returnErrors(err.response.data, err.response.status, errType)
			);
			dispatch({
				type: errType,
			});
			return null;
		});
};

/**
 * TODO: Complete this
 */
export const updateUser = () => {
	return {
		type: UPDATE_USER,
	};
};

export const setUsersLoading = () => {
	return {
		type: USERS_LOADING,
	};
};
