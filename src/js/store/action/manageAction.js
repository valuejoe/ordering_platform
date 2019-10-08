import Axios from "axios";
import API_PORT from "../../route/APIport";
import {
    SET_ERROR,
    CLEAR_STATUS,
    SET_SUCCESS,
    ADD_CATEGORY,
    ADD_MENU,
    GET_CATEGORY,
    GET_MENU,
    UPDATE_MENU,
    SELECT_EDIT,
    START_LOADING,
    STOP_LOADING,
    UPDATE_CATEGORY,
    DELETE_MENU,
    DELETE_CATEGORY,
    GET_ORDER,
    COMPLETED_ORDER,
    GET_COMPLETED
} from "./type";

export const completedAction = data => {
    return async dispatch => {
        try {
            const completedOrder = await Axios.post(
                `${API_PORT}/api/order/completed`,
                data
            );
            console.log(completedOrder);
            dispatch({ type: COMPLETED_ORDER, payload: completedOrder.data });
        } catch (err) {
            console.log(err.response.data);
        }
    };
};

export const clearStatusAction = () => {
    return dispatch => {
        dispatch({ type: CLEAR_STATUS });
    };
};

export const getOrderAction = () => {
    return async dispatch => {
        try {
            const getOrder = await Axios.get(`${API_PORT}/api/order`);
            dispatch({ type: GET_ORDER, payload: getOrder.data });
        } catch (err) {
            conslog(err.response.data);
        }
    };
};

export const getCompletedAction = () => {
    return async dispatch => {
        try {
            const getCompleted = await Axios.get(
                `${API_PORT}/api/order/completed`
            );
            dispatch({ type: GET_COMPLETED, payload: getCompleted.data });
        } catch (err) {
            console.log(err.response.data);
        }
    };
};
export const getCategoryAction = () => {
    return async dispatch => {
        try {
            const getCategory = await Axios.get(
                `${API_PORT}/api/posts/category`
            );
            dispatch({ type: GET_CATEGORY, payload: getCategory.data });
        } catch (err) {
            console.log(err.response.data);
        }
    };
};

export const getMenuAction = () => {
    return async dispatch => {
        try {
            let getMenu = await Axios.get(`${API_PORT}/api/posts/menu`);
            dispatch({ type: GET_MENU, payload: getMenu.data });
        } catch (err) {
            console.log(err);
        }
    };
};

export const addCategoryAction = data => {
    return async dispatch => {
        dispatch({ type: CLEAR_STATUS });
        let { errors, isError } = CategoryValidation(data);
        if (isError) {
            dispatch({
                type: SET_ERROR,
                payload: { addCategory: errors.name }
            });
        } else {
            try {
                const addCategory = await Axios.post(
                    `${API_PORT}/api/posts/add/category`,
                    data
                );
                dispatch({ type: ADD_CATEGORY, payload: addCategory.data });
                dispatch({ type: SET_SUCCESS, payload: { addCategory: true } });
            } catch (err) {
                errors = handleError(err.response.data);
                dispatch({ type: SET_ERROR, payload: { addCategory: errors } });
            }
        }
    };
};

export const addMenuAction = (data, filedata) => {
    return async dispatch => {
        console.log(data);
        dispatch({ type: CLEAR_STATUS });
        let { errors, isError } = MenuValidation(data);
        if (isError) {
            dispatch({ type: SET_ERROR, payload: errors });
        } else {
            try {
                const addMenu = await Axios.post(
                    `${API_PORT}/api/posts/add/menu`,
                    data
                );
                dispatch({ type: ADD_MENU, payload: addMenu.data });
                // upload if filedata not empty
                if (filedata) {
                    const imgData = new FormData();
                    imgData.append("file", filedata, addMenu.data._id);
                    console.log(filedata);
                    const addFile = await Axios.post(
                        `${API_PORT}/api/posts/upload`,
                        imgData
                    );
                }
                dispatch({ type: SET_SUCCESS, payload: { addMenu: true } });
            } catch (err) {
                errors = handleError(err.response.data);
                dispatch({ type: SET_ERROR, payload: { addMenu: errors } });
            }
        }
    };
};

//update Menu
export const updateMenuAction = (data, filedata) => {
    return async dispatch => {
        dispatch({ type: START_LOADING });
        let { errors, isError } = MenuValidation(data);
        if (isError) {
            dispatch({ type: SET_ERROR, payload: errors });
        } else {
            try {
                const updateMenu = await Axios.patch(
                    `${API_PORT}/api/posts/update/menu`,
                    data
                );
                dispatch({ type: UPDATE_MENU, payload: data });
                if (filedata) {
                    const imgData = new FormData();
                    imgData.append("file", filedata, data._id);
                    const updateImg = await Axios.post(
                        `${API_PORT}/api/posts/upload`,
                        imgData
                    );
                    window.location.reload();
                }
                dispatch({ type: SELECT_EDIT, payload: false });
                dispatch({ type: STOP_LOADING });
            } catch (err) {
                console.log(err.response.data);
                dispatch({ type: STOP_LOADING });
            }
        }
    };
};

// update category
export const updateCategoryAction = data => {
    return async dispatch => {
        const { errors, isError } = CategoryValidation(data);
        if (isError) {
            dispatch({ type: SET_ERROR, payload: errors });
        } else {
            try {
                const updateCategory = await Axios.patch(
                    `${API_PORT}/api/posts/update/category`,
                    data
                );
                dispatch({ type: UPDATE_CATEGORY, payload: data });
                dispatch({ type: SELECT_EDIT, payload: false });
            } catch (err) {
                console.log(err.response.data);
            }
        }
    };
};

//delete menu
export const deleteMenuAction = data => {
    return async dispatch => {
        try {
            const deleteMenu = await Axios.delete(
                `${API_PORT}/api/posts/delete/menu`,
                { data: data }
            );
            dispatch({ type: DELETE_MENU, payload: data });
        } catch (err) {
            console.log(err.response.data);
        }
    };
};

//delete category
export const deleteCategoryAction = data => {
    return async dispatch => {
        try {
            const deleteCategory = await Axios.delete(
                `${API_PORT}/api/posts/delete/category`,
                { data: data }
            );
            dispatch({ type: DELETE_CATEGORY, payload: data });
        } catch (err) {
            console.log(err.response.data);
            dispatch({ type: SET_ERROR, payload: { deleteCategory: true } });
        }
    };
};

const MenuValidation = data => {
    console.log(data);
    let errors = {};
    // is empty
    if (data.title.trim() == "") errors.title = "您尚未填寫商品名稱";
    if (data.category.trim() == "") errors.category = "您尚選擇分類";
    //check format
    if (!parseInt(data.cost, 10)) errors.cost = "非有效輸入";

    return { errors, isError: Object.keys(errors).length === 0 ? false : true };
};

const CategoryValidation = data => {
    let errors = {};
    if (data.name.trim() == "") errors.name = "您尚未填寫分類名稱";
    return { errors, isError: Object.keys(errors).length === 0 ? false : true };
};

const handleError = data => {
    console.log(data.message);

    let errors = {};
    if (data.message === "Category already exist") errors = "分類名稱已存在";
    if (data.message === "Category reached the maximum number")
        errors = "分類創建數量已達上限";
    if (data.message === "Menu already exist") errors = "此商品名稱已存在";
    if (data.message === "Category not found") errors = "找不到此分類";
    return errors;
};
