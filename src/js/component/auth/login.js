import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/action/authAction";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper, TextField, Button } from "@material-ui/core";
import { Grid, Typography, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        height: "70vh",
        alignItems: "center"
    }
}));

const login = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state.auth);
    const { errors, loading } = useSelector(state => state.UI);
    const [loginData, setLoginData] = useState("");
    const handleChange = e => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value });
    };
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(loginAction(loginData, props.history));
    };
    return (
        <div>
            {auth && <Redirect to="/addlist" />}
            <Container maxWidth="sm" className={classes.root}>
                <Paper style={{ padding: "10%" }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} align="center">
                                <Typography variant="h5" component="h3">
                                    菜單管理系統
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    type="email"
                                    label="Email"
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <TextField
                                    id="password"
                                    type="password"
                                    label="Password"
                                    fullWidth
                                    onChange={handleChange}
                                />
                                <Typography color="error">
                                    {errors.login}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <LinearProgress
                                    hidden={!loading}
                                    style={{ margin: "5px 0" }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    LOGIN
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default login;
