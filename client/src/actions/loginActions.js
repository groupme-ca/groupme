import axios from "axios";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/types";

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
const getLoginFailure = (error) => ({
    type: LOGIN_FAILURE,
});

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
        .post("/api/users/sign_in", user)
        .then((res) => {
            dispatch(getLoginSuccess(res.data));
        })
        .catch((err) => {
            dispatch(getLoginFailure());
        });
};
