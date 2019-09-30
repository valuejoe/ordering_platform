import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import Axios from "axios";
import store from "./store/store";
import "../index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import App from "./app";
import { logoutAction } from "./store/action/authAction";

const token = localStorage.IdToken;
if (token) {
    const tokenExpiredTime = jwtDecode(token).exp;
    if (tokenExpiredTime * 1000 < new Date()) {
        store.dispatch(logoutAction());
        window.location.href = "#/login";
    } else {
        store.dispatch({ type: "LOGIN" });
        Axios.defaults.headers.common["Authorization"] = token;
    }
}

const THEME = createMuiTheme({
    typography: {
        fontFamily: '"Noto Sans TC", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={THEME}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById("root")
);
