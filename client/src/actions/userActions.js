import axios from 'axios';
import { GET_USERS, FIND_USER, ADD_USER, DELETE_USER, UPDATE_USER, USERS_LOADING} from '../actions/types';

export const getUsers = () => dispatch => {
    dispatch(setItemsLoading());
    // This makes a GET request to our api route. 
    axios
        .get('/api/users')
        .then(res => 
            dispatch({
                type: GET_USERS, 
                payload: res.data
            }));

};

export const findUser = (user) => dispatch => {
    dispatch(setItemsLoading());
    // This makes a GET request to our api route. 
    axios
        .get('/api/users/sign_in', user)
        .then(res => 
            dispatch({
                type: FIND_USER, 
                payload: res.data
            }));

};

export const addUser = (user) => dispatch => {
    console.log("reached adduser");
    axios
        .post('/api/users', user)
        .then(res => dispatch({
            type: ADD_USER, 
            payload: res.data
        }))
};

export const deleteUser = (id) => dispatch => {
    axios
        .delete(`/api/users/${id}`)
        .then(res => dispatch({
            type: DELETE_USER, 
            payload: id
        }))
};

/**
 * TODO: Complete this
 */
export const updateUser = () => {
    return {
        type: UPDATE_USER
    };
};

export const setItemsLoading = () => {
    return {
        type: USERS_LOADING
    };
};