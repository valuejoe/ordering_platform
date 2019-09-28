import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Drawer from "../component/layout/drawer";
const ManageRoute = ({ component: Component, ...rest }) => {
    const { auth } = useSelector(state => state.auth);
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
