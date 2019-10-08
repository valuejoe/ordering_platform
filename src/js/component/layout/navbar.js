import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    AppBar,
    Toolbar,
    Tabs,
    Tab,
    Button,
    Badge,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartDialog from "../shoppingCar/shoppingCarDialog";
import {
    openShoppingCarAction,
    changeTabValueAction
} from "../../store/action/UIActions";
const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1
    }
}));

const Navbar = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const { category, orderCountSum } = useSelector(state => state.data);
    const { shoppingCarOpen, tabSelectValue } = useSelector(state => state.UI);

    const handleChange = (e, newValue) => {
        dispatch(changeTabValueAction(newValue));
    };

    const handleClick = () => {
        if (orderCountSum <= 0) {
            setOpen(true);
        } else {
            dispatch(openShoppingCarAction());
            props.history.push("/shoppingCar");
        }
    };

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                {!shoppingCarOpen ? (
                    <React.Fragment>
                        <Tabs
                            hidden={true}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="scrollable"
                            scrollButtons="on"
                            value={tabSelectValue}
                            onChange={handleChange}
                            className={classes.title}
                        >
                            {category &&
                                category.map((doc, index) => (
                                    <Tab label={doc.name} key={index} />
                                ))}
                        </Tabs>
                        <Button
                            variant="contained"
                            color={
                                orderCountSum !== 0 ? "secondary" : "default"
                            }
                            onClick={handleClick}
                        >
                            <Badge
                                className={classes.margin}
                                badgeContent={orderCountSum}
                                color="error"
                            >
                                購買確認
                            </Badge>
                        </Button>
                    </React.Fragment>
                ) : (
                    <Typography className={classes.title}>購物車</Typography>
                )}

                <ShoppingCartDialog
                    open={open}
                    onClose={() => setOpen(false)}
                />
            </Toolbar>
        </AppBar>
    );
};

export default withRouter(Navbar);
