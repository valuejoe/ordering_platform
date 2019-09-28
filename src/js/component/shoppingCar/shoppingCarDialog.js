import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from "@material-ui/core";

function ShoppingCarDialog(props) {
    const { onClose, open } = props;
    return (
        <Dialog
            onClose={() => onClose()}
            aria-labelledby="simple-dialog-title"
            open={open}
        >
            <DialogTitle id="simple-dialog-title">購物車</DialogTitle>
            <DialogContent>
                <Typography>您還沒選擇商品喔!</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>繼續購物</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ShoppingCarDialog;
