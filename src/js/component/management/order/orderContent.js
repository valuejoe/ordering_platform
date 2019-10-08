import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Typography, Table, TableBody } from "@material-ui/core";
import { TableCell, TableHead, TableRow, Button } from "@material-ui/core";
import { completedAction } from "../../../store/action/manageAction";

const Artical = ({ select }) => {
    return (
        <div style={{ maxHeight: "60vh", overflow: "auto" }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>名稱</TableCell>
                        <TableCell>數量</TableCell>
                        <TableCell>金額</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {select.order &&
                        select.order.map((doc, index) => (
                            <TableRow hover key={index}>
                                <TableCell>{doc.title}</TableCell>
                                <TableCell>{doc.count}</TableCell>
                                <TableCell>{doc.cost}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

const Footer = ({ select }) => {
    return (
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={1} size="medium" align="right">
                            總數量
                        </TableCell>
                        <TableCell align="right">{select.countSum}份</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell size="medium" align="right">
                            總金額
                        </TableCell>
                        <TableCell size="medium" align="right">
                            {select.costSum}元
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

const OrderContent = props => {
    const { select, onSelect } = props;
    const dispatch = useDispatch();
    const { order } = useSelector(state => state.manage);
    useEffect(() => {
        onSelect("", 0);
    }, [order]);
    const handleCompleted = () => {
        dispatch(completedAction(select));
    };
    return (
        <Paper>
            <div style={{ padding: "3%", height: "100%" }}>
                <Typography>訂單編碼：{select._id}</Typography>
                {select && (
                    <Typography>
                        日期：{new Date(select.expired).toLocaleString()}
                    </Typography>
                )}
            </div>
            <Artical select={select} />
            <Footer select={select} />
            <Button
                disabled={select ? false : true}
                variant="contained"
                color="primary"
                style={{ float: "right", marginTop: "10px", width: "100px" }}
                onClick={handleCompleted}
            >
                完成
            </Button>
        </Paper>
    );
};

export default OrderContent;
