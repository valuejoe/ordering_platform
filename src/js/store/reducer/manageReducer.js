import { ADD_CATEGORY, ADD_MENU, GET_CATEGORY } from "../action/type";

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
        case ADD_CATEGORY:
            return {
                ...state,
                category: [...state.category, action.payload]
            };
        default:
            return state;
    }
};

export default manageReducer;
