import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Input,
    Typography,
    Button,
    IconButton,
    Grid
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/add";
import RemoveIcon from "@material-ui/icons/remove";

function ProductDialog(props) {
    const { onClose, open, id, count } = props;
    const { product, order } = useSelector(state => state.data);

    const singleProduct = product.find(doc => doc._id === id);

    const cost = singleProduct.cost;
    const title = singleProduct.title;

    const [total, setTotal] = useState(count);

    useEffect(() => {
        setTotal(count);
    }, [order]);

    const handleAddClick = () => {
        setTotal(total + 1);
    };
    const handleSubClick = () => {
        if (total > 0) {
            setTotal(total - 1);
        }
    };
    const handleChange = e => {
        if (e.target.value.match(/^\d*$/)) {
            setTotal(e.target.value);
        }
    };
    const handleSubmit = () => {
        let costTotal = total * cost;
        let data = {
            id: id,
            title: title,
            count: parseInt(total),
            cost: costTotal
        };
        if (total > 0) {
            props.ProductDialogSubmit(data);
        }
        setTotal(count);
        onClose();
    };
    const handleCancel = () => {
        onClose();
        setTotal(count);
    };

    return (
        <Dialog
            onClose={handleCancel}
            aria-labelledby="simple-dialog-title"
            open={open}
        >
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography>份數：</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Input
                            value={total}
                            onChange={handleChange}
                            style={{ maxWidth: "100px" }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton size="small" onClick={handleAddClick}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton size="small" onClick={handleSubClick}>
                            <RemoveIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                <Typography style={{ marginTop: "10px" }}>
                    金額：{total * cost}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>取消</Button>
                <Button onClick={handleSubmit}>確定</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProductDialog;
