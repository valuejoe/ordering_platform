import {
    ADD_ORDER,
    SELECT_ORDER,
    DELETE_ORDER,
    UPDATE_ORDER,
    SUM_ORDER,
    INIT_ORDER,
    UPDATE_ORDER_COUNT
} from "../action/type";

const initState = {
    orderCostSum: 0,
    orderCountSum: 0,
    order: [],
    product: [
        { id: 0, title: "炸雞排", cost: 65, select: false, category: "炸物" },
        { id: 1, title: "炸雞腿", cost: 35, select: false, category: "炸物" },
        { id: 2, title: "甜不辣", cost: 30, select: false, category: "副食" },
        { id: 3, title: "洋蔥圈", cost: 30, select: false, category: "副食" },
        { id: 4, title: "薯條", cost: 20, select: false, category: "炸物" },
        { id: 5, title: "可樂餅", cost: 20, select: false, category: "炸物" },
        { id: 6, title: "百頁豆腐", cost: 20, select: false, category: "副食" },
        { id: 7, title: "杏包菇", cost: 20, select: false, category: "副食" },
        { id: 8, title: "薯餅", cost: 20, select: false, category: "炸物" },
        { id: 9, title: "花枝丸", cost: 20, select: false, category: "炸物" },
        { id: 10, title: "花枝丸", cost: 30, select: false, category: "菜菜" },
        { id: 11, title: "炸雞排", cost: 45, select: false, category: "肉肉" }
    ],
    category: [
        { id: 0, name: "炸物" },
        { id: 1, name: "副食" },
        { id: 2, name: "菜菜" },
        { id: 3, name: "肉肉" }
    ]
};

const dataReducer = (state = initState, action) => {
    switch (action.type) {
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
        case INIT_ORDER:
            return initState;
        default:
            return state;
    }
};

export default dataReducer;
