import axios from "axios";
import {
	GET_USERS,
	FIND_USER,
	DELETE_USER,
	UPDATE_USER,
	USERS_LOADING,
} from "../actions/types";

export const getUsers = () => async (dispatch) => {
	dispatch(setItemsLoading());
	// This makes a GET request to our api route.
	await axios.get("/api/users").then((res) =>
		dispatch({
			type: GET_USERS,
			payload: res.data,
		})
	);
};

export const findUser = (user) => async (dispatch) => {
	dispatch(setItemsLoading());
	// This makes a POST request to our api route to find the specific user.
	await axios.post("/api/users", user).then((res) =>
		dispatch({
			type: FIND_USER,
			payload: res.data,
		})
	);
};

export const deleteUser = (id) => async (dispatch) => {
	await axios.delete(`/api/users/${id}`).then((res) =>
		dispatch({
			type: DELETE_USER,
			payload: id,
		})
	);
};

export const addFriend = (id, friendId) => async (dispatch) => {
	// await ax
};
/**
 * TODO: Complete this
 */
export const updateUser = () => {
	return {
		type: UPDATE_USER,
	};
};

export const setItemsLoading = () => {
	return {
		type: USERS_LOADING,
	};
};
