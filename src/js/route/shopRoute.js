import React from "react";
import { Route } from "react-router-dom";
import Home from "../component/layout/home";

const ShopRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (
                <Home>
                    <Component {...props} />
                </Home>
            )}
        />
    );
};

export default ShopRoute;
