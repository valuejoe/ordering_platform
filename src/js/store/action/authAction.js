import { LOGIN } from "../action/type";

export const loginAction = (data, history) => {
    return dispatch => {
        console.log(data);
        dispatch({ type: LOGIN });
        history.push("/addlist");
    };
};
