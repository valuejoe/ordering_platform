import {
    OPEN_SHOPPINGCAR,
    CLOSE_SHOPPINGCAR,
    CHANGE_TAB,
    SET_ERROR,
    CLEAR_STATUS,
    SET_SUCCESS,
    SELECT_EDIT,
    START_LOADING,
    STOP_LOADING
} from "../action/type";

const initState = {
    loading: false,
    shoppingCarOpen: false,
    tabSelectValue: 0,
    errors: "",
    success: "",
    edit: ""
};

const UIReducer = (state = initState, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                loading: true
            };
        case STOP_LOADING:
            return {
                ...state,
                loading: false
            };
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
        case SELECT_EDIT:
            return {
                ...state,
                edit: action.payload
            };
        default:
            return state;
    }
};

export default UIReducer;
