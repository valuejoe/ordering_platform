import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import "../index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import App from "./app";

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
