import {
    OPEN_SHOPPINGCAR,
    CLOSE_SHOPPINGCAR,
    CHANGE_TAB,
    SET_ERROR,
    CLEAR_STATUS,
    SET_SUCCESS
} from "../action/type";

const initState = {
    loading: false,
    shoppingCarOpen: false,
    tabSelectValue: 0,
    errors: "",
    success: ""
};

const UIReducer = (state = initState, action) => {
    switch (action.type) {
        case OPEN_SHOPPINGCAR:
            return {
                ...state,
                shoppingCarOpen: true
            };
        case CLOSE_SHOPPINGCAR:
            return {
                ...state,
                shoppingCarOpen: false
            };
        case CHANGE_TAB:
            return {
                ...state,
                tabSelectValue: action.payload
            };
        case SET_ERROR:
            return {
                ...state,
                errors: action.payload
            };
        case CLEAR_STATUS:
            return {
                ...state,
                errors: "",
                success: false
            };
        case SET_SUCCESS:
            return {
                ...state,
                success: action.payload
            };
        default:
            return state;
    }
};

export default UIReducer;
