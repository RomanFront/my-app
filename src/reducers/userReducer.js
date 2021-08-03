import { ADD_USER, REMOVE_USER } from "../actions/actionTypes";

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                userUid: action.user.uid,
            }
        case REMOVE_USER:
            return {
                ...state,
                userUid: undefined,
            }
        default:
            return state;
    }
}

export default userReducer;