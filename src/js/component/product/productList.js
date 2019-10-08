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
    image: {
        [theme.breakpoints.up("sm")]: {
            height: "130px"
        },
        height: "90px"
    },
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
    const { product } = props;
    const [open, setOpen] = React.useState(false);
    const handleClickCancel = () => {
        let data = { title: product.title };
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
                    product.select
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
                        alt={product.title}
                        image={`http://localhost:3030/public/${product._id}.jpg`}
                        title={product.title}
                        className={classes.image}
                    />
                </Grid>
                <Grid item xs={5} sm={12} container className={classes.content}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h6">
                            {product.title}
                        </Typography>
                    </Grid>
                    <Grid item></Grid>
                    <Grid item></Grid>

                    <Typography component="p">
                        每份 {product.cost} 元
                    </Typography>
                </Grid>
                <Grid item xs={3} sm={12} style={{ display: "flex" }}>
                    {product.select ? (
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
                        id={product._id}
                        count={0}
                        ProductDialogSubmit={handleProductDialogSubmit}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}
