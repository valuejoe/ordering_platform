import axios from "axios";
import API_PORT from "../../route/APIport";
import {
    SET_ERROR,
    CLEAR_STATUS,
    SET_SUCCESS,
    ADD_CATEGORY,
    ADD_MENU,
    GET_CATEGORY
} from "./type";

export const clearStatusAction = () => {
    return dispatch => {
        dispatch({ type: CLEAR_STATUS });
    };
};

export const getCategoryAction = () => {
    return async dispatch => {
        try {
            const getCategory = await axios.get(
                `${API_PORT}/api/posts/category`
            );
            console.log(getCategory);
            dispatch({ type: GET_CATEGORY, payload: getCategory.data });
        } catch (err) {
            console.log(err.response.data);
        }
    };
};

export const addCategoryAction = data => {
    return async dispatch => {
        dispatch({ type: CLEAR_STATUS });
        try {
            const addCategory = await axios.post(
                `${API_PORT}/api/posts/add/category`,
                data
            );
            dispatch({ type: ADD_CATEGORY, payload: addCategory.data });
            dispatch({ type: SET_SUCCESS, payload: { addCategory: true } });
        } catch (err) {
            dispatch({ type: SET_ERROR, payload: err.response.data });
        }
    };
};

export const addMenuAction = (data, filedata) => {
    return async dispatch => {
        dispatch({ type: CLEAR_STATUS });
        const { errors, isError } = addMenuValidation(data);
        if (isError) {
            dispatch({ type: SET_ERROR, payload: errors });
        } else {
            try {
                const addMenu = await axios.post(
                    `${API_PORT}/api/posts/add/menu`,
                    data
                );
                dispatch({ type: ADD_MENU, payload: addMenu.data });

                // upload if filedata not empty
                if (filedata) {
                    const imgData = new FormData();
                    imgData.append("file", filedata, addMenu.data._id);
                    const addFile = await axios.post(
                        `${API_PORT}/api/posts/upload`,
                        imgData
                    );
                }
                dispatch({ type: SET_SUCCESS, payload: { addMenu: true } });
            } catch (err) {
                console.log(err.response.data);
                // const errData = { addMenu: err.response.data };
                // dispatch({ type: SET_ERROR, payload: err.response.data });
            }
        }
    };
};

const addMenuValidation = data => {
    let errors = {};
    // is empty
    if (data.title.trim() == "") errors.title = "您尚未填寫商品名稱";
    if (data.cost.trim() == "") errors.cost = "您尚未填寫金額";
    if (data.category.trim() == "") errors.category = "您尚選擇分類";
    //check format
    if (!parseInt(data.cost, 10)) errors.cost = "只能輸入數字";

    return { errors, isError: Object.keys(errors).length === 0 ? false : true };
};
