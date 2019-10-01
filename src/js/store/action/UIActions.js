import {
    OPEN_SHOPPINGCAR,
    CLOSE_SHOPPINGCAR,
    CHANGE_TAB,
    SELECT_EDIT
} from "./type";

// Tab value action
export const changeTabValueAction = data => {
    return dispatch => {
        dispatch({ type: CHANGE_TAB, payload: data });
    };
};

//Shopping car action
export const openShoppingCarAction = () => {
    return dispatch => {
        dispatch({ type: OPEN_SHOPPINGCAR });
    };
};

export const closeShoppingCarAction = () => {
    return dispatch => {
        dispatch({ type: CLOSE_SHOPPINGCAR });
    };
};

export const selectEditAction = data => {
    return dispatch => {
        dispatch({ type: SELECT_EDIT, payload: data });
    };
};
