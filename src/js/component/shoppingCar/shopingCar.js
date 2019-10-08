import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, TableHead, TableRow, Button } from "@material-ui/core";
import { TableCell, TableBody } from "@material-ui/core";
import { Container, Paper, Grid, ButtonGroup } from "@material-ui/core";
import {
    closeShoppingCarAction,
    openShoppingCarAction
} from "../../store/action/UIActions";
import {
    orderCostSumAction,
    submitOrderAction
} from "../../store/action/dataActions";
import TableItem from "./TableItem";

const Header = () => {
    return (
        <TableRow>
            <TableCell size="small">商品</TableCell>
            <TableCell size="small" align="right">
                數量
            </TableCell>
            <TableCell size="small" align="right">
                價錢
            </TableCell>
            <TableCell size="medium" align="right"></TableCell>
        </TableRow>
    );
};

const Body = ({ order }) => {
    return (
        <React.Fragment>
            {order &&
                order.map((data, index) => (
                    <TableRow key={index}>
                        <TableItem data={data} />
                    </TableRow>
                ))}
        </React.Fragment>
    );
};

const Footer = ({ subtotal }) => {
    return (
        <TableRow>
            <TableCell />
            <TableCell colSpan={2} size="medium" align="right">
                總金額
            </TableCell>
            <TableCell size="medium" align="right">
                {subtotal} 元
            </TableCell>
        </TableRow>
    );
};

const ShoppingCar = props => {
    const dispatch = useDispatch();
    const { order, orderCostSum } = useSelector(state => state.data);
    const { shoppingCarOpen } = useSelector(state => state.UI);
    const subtotal = orderCostSum;
    useEffect(() => {
        dispatch(openShoppingCarAction());

        return () => {
            dispatch(closeShoppingCarAction());
        };
    }, []);

    useEffect(() => {
        dispatch(orderCostSumAction(order));
        if (order.length <= 0) {
            dispatch(closeShoppingCarAction());
        }
    }, [order]);

    const handlePreviousClick = () => {
        props.history.push("/");
    };

    const handleSubmitClick = () => {
        dispatch(submitOrderAction(order));
    };
    return (
        <div>
            {!shoppingCarOpen && <Redirect to="/" />}
            <Container maxWidth="sm" style={{ padding: "5% 2%" }}>
                <Paper>
                    <Grid container>
                        <Grid item xs={12}>
                            <Table
                                style={{
                                    marginTop: "5%"
                                }}
                            >
                                <TableHead>
                                    <Header />
                                </TableHead>
                                <TableBody>
                                    <Body order={order} />
                                    <Footer subtotal={subtotal} />
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonGroup fullWidth size="large">
                                <Button
                                    style={{ borderTopLeftRadius: 0 }}
                                    onClick={handlePreviousClick}
                                >
                                    返回選購
                                </Button>
                                <Button
                                    style={{ borderTopRightRadius: 0 }}
                                    onClick={handleSubmitClick}
                                >
                                    送出訂單
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
};

export default ShoppingCar;
