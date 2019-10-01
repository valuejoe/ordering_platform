import {
    OPEN_SHOPPINGCAR,
    CLOSE_SHOPPINGCAR,
    CHANGE_TAB,
    SELECT_EDITMENU
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

export const selectEditMenuAction = (data) => {
    return dispatch => {
        dispatch({type: SELECT_EDITMENU, payload: data})
    }
}