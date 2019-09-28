import { LOGIN } from "../action/type";

const initState = {
    auth: true
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                auth: true
            };
        default:
            return state;
    }
};

export default authReducer;
