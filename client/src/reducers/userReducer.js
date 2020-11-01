// This is where the state is going to go, and where actions go 
// This allows us to hookup to the backend and get data from mongo. 
import { GET_USERS, ADD_USER, DELETE_USER, UPDATE_USER} from '../actions/types';
// Add the users array here. 
const initialState = {
    users: []
}
// Below we just return each thing
export default function(state = initialState, action){
    switch (action.type){
        case GET_USERS:
            return {
                ...state 
            }
            default: 
                return state
    }
}