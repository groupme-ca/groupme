import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";
import {
	USER_LOADED,
	USER_LOADING,
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REGISTER_START,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGOUT,
	AUTH_ERROR,
} from "./types";

// Start the register.
const getRegisterStart = () => ({
	type: REGISTER_START,
});

// Register was successful.
const getRegisterSuccess = (user) => ({
	type: REGISTER_SUCCESS,
	payload: user,
});

// Register was a failure.
const getRegisterFailure = () => ({
	type: REGISTER_FAILURE,
});
// Start the login.
const getLoginStart = () => ({
	type: LOGIN_START,
});

// Login was successful.
const getLoginSuccess = (user) => ({
	type: LOGIN_SUCCESS,
	payload: user,
});

// Login was a failure.
const getLoginFailure = () => ({
	type: LOGIN_FAILURE,
});

/**
 * A thunk to register users asynchronously.
 * @param user: The user to register
 */
export const registerUser = (user) => async (dispatch) => {
	// Start the register
	dispatch(getRegisterStart());
	await axios
		.post("/api/auth/register", user)
		.then((res) => {
			dispatch(clearErrors());
			dispatch(getRegisterSuccess(res.data));
		})
		.catch((err) => {
			dispatch(
				returnErrors(
					err.response.data,
					err.response.status,
					REGISTER_FAILURE
				)
			);
			dispatch(getRegisterFailure());
		});
};

/**
 * A thunk which logs in the user asynchronously.
 *
 * @param user: The filter for this user.
 * Dispatches getLoginSuccess with the user data on success.
 * Dispatches getLoginFailure with the error on failure.
 */
export const loginUser = (user) => async (dispatch) => {
	// Start the login
	dispatch(getLoginStart());
	// Make the request to the server to see if there is a user with the matching credentials.
	await axios
		.post("/api/auth/login", user)
		.then((res) => {
			dispatch(clearErrors());
			dispatch(getLoginSuccess(res.data));
		})
		.catch((err) => {
			dispatch(
				returnErrors(
					err.response.data,
					err.response.status,
					LOGIN_FAILURE
				)
			);
			dispatch(getLoginFailure());
		});
};

/**
 * Check token & load user
 * Dispatches user loading.
 * On success, dispatches user loaded and sends the token and user data
 * On failure, dispatches auth error and sends the errors to the error reducer.
 */
export const loadUser = () => async (dispatch, getState) => {
	// User loading
	dispatch({ type: USER_LOADING });

	await axios
		.get("/api/auth/user", tokenConfig(getState))
		.then((res) => {
			dispatch(clearErrors);
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch(
				returnErrors(err.response.data, err.response.status, AUTH_ERROR)
			);
			dispatch({
				type: AUTH_ERROR,
			});
		});
};

/**
 * Logout the user, this clears all of the user information from the auth state.
 * Also resets all of the redux states back to initialState.
 */
export const logoutUser = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};

/**
 * Generates a config containing the approprite headers, with the token if it exists.
 * @param getState Redux property in order to get access to current state
 */
export const tokenConfig = (getState) => {
	// Get token from localstorage
	const token = getState().auth.token;

	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	if (token) {
		config.headers["x-auth-token"] = token;
	}
	return config;
};
