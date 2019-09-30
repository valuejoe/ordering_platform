import { LOGIN, LOGOUT } from "../action/type";

const initState = {
    auth: false
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                auth: true
            };
        case LOGOUT:
            return {
                ...state,
                auth: false
            };
        default:
            return state;
    }
};

export default authReducer;
