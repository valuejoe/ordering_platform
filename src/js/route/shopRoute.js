import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import Home from "../component/layout/home";
import { getCategoryAction, getMenuAction } from "../store/action/dataActions";

const ShopRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategoryAction());
        dispatch(getMenuAction());
    }, []);
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
