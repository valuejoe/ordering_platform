import {
    ADD_ORDER,
    SELECT_ORDER,
    DELETE_ORDER,
    UPDATE_ORDER,
    SUM_ORDER,
    INIT_ORDER,
    UPDATE_ORDER_COUNT
} from "./type";

export const submitOrderAction = data => {
    return dispatch => {
        dispatch({ type: INIT_ORDER });
    };
};

export const addOrderAction = data => {
    return dispatch => {
        if (data.cost >= 0) {
            dispatch({ type: ADD_ORDER, payload: data });
            dispatch({ type: SELECT_ORDER, payload: data });
            dispatch({ type: UPDATE_ORDER_COUNT, payload: data.count });
        }
    };
};

export const updateOrderAction = data => {
    return dispatch => {
        if (data.cost <= 0) {
            dispatch({ type: DELETE_ORDER, payload: data });
            dispatch({ type: SELECT_ORDER, payload: data });
        } else {
            dispatch({ type: UPDATE_ORDER, payload: data });
        }
        dispatch({ type: UPDATE_ORDER_COUNT, payload: data.count });
    };
};

export const deleteOrderAction = data => {
    return dispatch => {
        dispatch({ type: DELETE_ORDER, payload: data });
        dispatch({ type: SELECT_ORDER, payload: data });
        dispatch({ type: UPDATE_ORDER_COUNT, payload: data.count });
    };
};

export const orderCostSumAction = data => {
    let sum = 0;
    data.map(data => {
        sum = data.cost + sum;
    });
    return dispatch => {
        dispatch({ type: SUM_ORDER, payload: sum });
    };
};

function sum(data) {
    let sum = 0;
    data.map(data => {
        sum = data.cost + sum;
    });
    return sum;
}
