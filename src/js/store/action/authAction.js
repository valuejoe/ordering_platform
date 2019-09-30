import { LOGIN, LOGOUT, SET_ERROR, CLEAR_STATUS } from "../action/type";
import Axios from "axios";
import API_PORT from "../../route/APIport";

export const loginAction = (data, history) => {
    return async dispatch => {
        dispatch({ type: CLEAR_STATUS });
        try {
            const login = await Axios.post(`${API_PORT}/api/user/login`, data);
            setAuthorizationHeader(login.data);
            dispatch({ type: LOGIN });
            history.push("/addlist");
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: SET_ERROR,
                payload: { login: "帳號或密碼輸入錯誤" }
            });
        }
    };
};

export const logoutAction = () => {
    return dispatch => {
        localStorage.removeItem("IdToken");
        delete Axios.defaults.headers.common["Authorization"];
        dispatch({ type: LOGOUT });
    };
};
const setAuthorizationHeader = token => {
    localStorage.setItem("IdToken", token);
    Axios.defaults.headers.common["Authorization"] = token;
};
