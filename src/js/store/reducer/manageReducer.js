import { ADD_CATEGORY, ADD_MENU, GET_CATEGORY, GET_MENU,UPDATE_MENU } from "../action/type";

const initState = {
    category: [],
    product: []
};

const manageReducer = (state = initState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};

export default manageReducer;
