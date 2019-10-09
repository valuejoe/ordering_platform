import React from "react";
import { Paper, Typography, Table, TableBody } from "@material-ui/core";
import { TableCell, TableHead, TableRow, Button } from "@material-ui/core";

const Artical = ({ select }) => {
    return (
        <div style={{ maxHeight: "53vh", overflow: "auto" }}>
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

const CompletedContent = props => {
    const { select } = props;

    return (
        <Paper>
            <div style={{ padding: "3%", height: "100%" }}>
                <Typography>訂單編碼：{select._id}</Typography>
                {select && (
                    <React.Fragment>
                        <Typography>
                            訂單日期：
                            {new Date(select.orderAt).toLocaleString()}
                        </Typography>
                        <Typography>
                            完成日期：
                            {new Date(select.completedAt).toLocaleString()}
                        </Typography>
                    </React.Fragment>
                )}
            </div>
            <Artical select={select} />
            <Footer select={select} />
        </Paper>
    );
};

export default CompletedContent;
