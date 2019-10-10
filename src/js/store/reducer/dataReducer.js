import { ADD_ORDER, SELECT_ORDER, DELETE_ORDER } from "../action/type";
import { UPDATE_ORDER, SUM_ORDER, UPDATE_ORDER_COUNT } from "../action/type";
import { FETCH_MENU, FETCH_CATEGORY, SUBMIT_ORDER } from "../action/type";

const initState = {
    orderCostSum: 0,
    orderCountSum: 0,
    order: [],
    product: [],
    category: []
};

const dataReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_MENU:
            return {
                ...state,
                product: action.payload
            };
        case FETCH_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
        case ADD_ORDER:
            return {
                ...state,
                order: [...state.order, action.payload]
            };
        case SELECT_ORDER:
            const newProduct = state.product.map((data, index) => {
                if (data.title === action.payload.title) {
                    return { ...data, select: !data.select };
                } else {
                    return data;
                }
            });
            return {
                ...state,
                product: newProduct
            };
        case UPDATE_ORDER:
            const updateOrder = state.order.map(data => {
                if (data.title === action.payload.title) {
                    return action.payload;
                } else {
                    return data;
                }
            });
            return {
                ...state,
                order: updateOrder
            };
        case DELETE_ORDER:
            const deleteOrder = state.order.filter(
                data => data.title !== action.payload.title
            );
            return {
                ...state,
                order: deleteOrder
            };
        case SUM_ORDER:
            return {
                ...state,
                orderCostSum: action.payload
            };
        case UPDATE_ORDER_COUNT:
            let newOrderCount = 0;
            state.order.map(doc => {
                newOrderCount = newOrderCount + doc.count;
            });
            return {
                ...state,
                orderCountSum: newOrderCount
            };
        case SUBMIT_ORDER:
            return state;
        default:
            return state;
    }
};

export default dataReducer;
