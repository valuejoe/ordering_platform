import {
    OPEN_SHOPPINGCAR,
    CLOSE_SHOPPINGCAR,
    CHANGE_TAB,
} from "../action/type";

const initState = {
    loading: false,
    shoppingCarOpen: false,
    tabSelectValue: 0,
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
        default:
            return state;
    }
};

export default UIReducer;
