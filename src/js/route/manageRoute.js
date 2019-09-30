import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Drawer from "../component/layout/drawer";
import { getCategoryAction, getMenuAction } from "../store/action/manageAction";

const ManageRoute = ({ component: Component, ...rest }) => {
    const { auth } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategoryAction());
        dispatch(getMenuAction());
    }, []);
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
