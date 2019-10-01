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
    SELECT_EDITMENU,
    START_LOADING,
    STOP_LOADING
} from "./type";

export const clearStatusAction = () => {
    return dispatch => {
        dispatch({ type: CLEAR_STATUS });
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
            const getMenu = await Axios.get(`${API_PORT}/api/posts/menu`);
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
                dispatch({ type: SELECT_EDITMENU, payload: false });
                dispatch({ type: STOP_LOADING });
            } catch (err) {
                console.log(err.response.data);
                dispatch({ type: STOP_LOADING });
            }
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
