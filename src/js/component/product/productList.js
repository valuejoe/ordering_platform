import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, CardMedia, Typography, Button } from "@material-ui/core";
import ProductDialog from "./productDialog";
import {
    deleteOrderAction,
    addOrderAction
} from "../../store/action/dataActions";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: "80px",
        [theme.breakpoints.up("sm")]: {
            margin: theme.spacing(2)
        },
        [theme.breakpoints.up("md")]: {
            margin: theme.spacing(3)
        }
    },
    image: {},
    content: { padding: theme.spacing(2) },

    button: {
        [theme.breakpoints.up("sm")]: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        },
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    }
}));

export default function ProductList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { title, cost, select, id } = props.product;
    const [open, setOpen] = React.useState(false);
    const handleClickCancel = () => {
        let data = { title: title };
        dispatch(deleteOrderAction(data));
    };

    const handleProductDialogSubmit = e => {
        dispatch(addOrderAction(e));
    };
    return (
        <Paper className={classes.root}>
            <Grid
                container
                style={
                    select
                        ? {
                              backgroundColor: "#6eabe7"
                          }
                        : {
                              backgroundColor: "white"
                          }
                }
            >
                <Grid item xs={4} sm={12} align="center">
                    <CardMedia
                        component="img"
                        alt={title}
                        height="120"
                        image={`http://localhost:3030/public/${id}.jpg`}
                        title={title}
                    />
                </Grid>
                <Grid item xs={5} sm={12} container className={classes.content}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item></Grid>
                    <Grid item></Grid>

                    <Typography component="p">每份 {cost} 元</Typography>
                </Grid>
                <Grid item xs={3} sm={12} style={{ display: "flex" }}>
                    {select ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClickCancel}
                            fullWidth
                            className={classes.button}
                        >
                            取消
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="default"
                            onClick={() => setOpen(true)}
                            fullWidth
                            className={classes.button}
                        >
                            選擇
                        </Button>
                    )}
                    <ProductDialog
                        open={open}
                        onClose={() => setOpen(false)}
                        id={id}
                        count={0}
                        ProductDialogSubmit={handleProductDialogSubmit}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}
