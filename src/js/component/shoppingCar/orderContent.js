import React from "react";
import { useDispatch } from "react-redux";
import { TableCell, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
    deleteOrderAction,
    updateOrderAction
} from "../../store/action/dataActions";
import ProductDialog from "../product/productDialog";

const OrderContent = props => {
    const { data } = props;
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickDelete = () => {
        dispatch(deleteOrderAction(data));
    };

    const handlrClickEdit = () => {
        setOpen(true);
    };

    const handleProductDialogSubmit = e => {
        dispatch(updateOrderAction(e));
    };
    return (
        <React.Fragment>
            <TableCell size="small">{data.title}</TableCell>
            <TableCell size="small" align="right">
                {data.count}
            </TableCell>
            <TableCell size="small" align="right">
                {data.cost}
            </TableCell>
            <TableCell size="medium" align="right">
                <IconButton size="small" onClick={handlrClickEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={handleClickDelete}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
            <ProductDialog
                open={open}
                onClose={() => setOpen(false)}
                id={data.id}
                count={data.count}
                ProductDialogSubmit={handleProductDialogSubmit}
            />
        </React.Fragment>
    );
};

export default OrderContent;
