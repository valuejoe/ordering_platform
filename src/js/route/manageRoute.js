import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Drawer from "../component/layout/drawer";
import {
    getCategoryAction,
    getMenuAction,
    clearStatusAction,
    getOrderAction,
    getCompletedAction
} from "../store/action/manageAction";

const ManageRoute = ({ component: Component, ...rest }) => {
    const { auth } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategoryAction());
        dispatch(getMenuAction());
    }, []);
    useEffect(() => {
        if (rest.path === "/order") dispatch(getOrderAction());
        if (rest.path === "/completed") dispatch(getCompletedAction());
        dispatch(clearStatusAction());
    }, [rest]);
    return (
        <Route
            {...rest}
            render={props =>
                auth ? (
                    <Drawer>
                        <Component {...props} />
                    </Drawer>
                ) : (
                    <Redirect exact to="/login" />
                )
            }
        />
    );
};

export default ManageRoute;
