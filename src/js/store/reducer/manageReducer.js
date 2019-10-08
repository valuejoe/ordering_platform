import {
    GET_CATEGORY,
    GET_MENU,
    GET_ORDER,
    GET_COMPLETED,
    ADD_CATEGORY,
    ADD_MENU,
    UPDATE_MENU,
    UPDATE_CATEGORY,
    DELETE_MENU,
    DELETE_CATEGORY,
    COMPLETED_ORDER
} from "../action/type";
import { finished } from "stream";

const initState = {
    order: [],
    completed: [],
    category: [],
    product: []
};

const manageReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ORDER:
            return {
                ...state,
                order: action.payload
            };
        case GET_COMPLETED:
            return {
                ...state,
                completed: action.payload
            };
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
        case GET_MENU:
            return {
                ...state,
                product: action.payload
            };
        case ADD_CATEGORY:
            return {
                ...state,
                category: [...state.category, action.payload]
            };
        case ADD_MENU:
            return {
                ...state,
                product: [...state.product, action.payload]
            };
        case UPDATE_MENU:
            return {
                ...state,
                product: state.product.map(doc => {
                    if (action.payload._id === doc._id) {
                        return action.payload;
                    } else {
                        return doc;
                    }
                })
            };
        case UPDATE_CATEGORY:
            return {
                ...state,
                category: state.category.map(doc => {
                    if (action.payload._id === doc._id) {
                        return action.payload;
                    } else {
                        return doc;
                    }
                })
            };
        case DELETE_MENU:
            return {
                ...state,
                product: state.product.filter(
                    doc => doc._id !== action.payload._id
                )
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                category: state.category.filter(
                    doc => doc._id !== action.payload._id
                )
            };
        case COMPLETED_ORDER:
            return {
                ...state,
                completed: [action.payload, ...state.completed],
                order: state.order.filter(doc => doc._id !== action.payload._id)
            };
        default:
            return state;
    }
};

export default manageReducer;
