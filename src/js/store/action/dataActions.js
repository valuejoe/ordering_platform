import {
    ADD_ORDER,
    SELECT_ORDER,
    DELETE_ORDER,
    UPDATE_ORDER,
    SUM_ORDER,
    UPDATE_ORDER_COUNT,
    FETCH_MENU,
    FETCH_CATEGORY
} from "./type";
import Axios from "axios";
import API_PORT from "../../route/APIport";

export const getCategoryAction = () => {
    return async dispatch => {
        try {
            const getCategory = await Axios.get(
                `${API_PORT}/api/posts/category`
            );
            dispatch({
                type: FETCH_CATEGORY,
                payload: getCategory.data
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const getMenuAction = () => {
    return async dispatch => {
        try {
            const getMenu = await Axios.get(`${API_PORT}/api/posts/menu`);
            dispatch({ type: FETCH_MENU, payload: getMenu.data });
        } catch (err) {
            console.log(err);
        }
    };
};

export const submitOrderAction = data => {
    return async dispatch => {
        const order = { order: data };
        try {
            const orderSubmit = await Axios.post(
                `${API_PORT}/api/order/addOrder`,
                order
            );
            window.location.reload();
        } catch (err) {
            console.log(err.response.data);
        }
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
