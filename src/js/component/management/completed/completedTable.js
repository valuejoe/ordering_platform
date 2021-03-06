import React from "react";
import { useSelector } from "react-redux";
import { ButtonBase, Paper, Grid, Typography, Fade } from "@material-ui/core";

const CompletedTable = props => {
    const { completed } = useSelector(state => state.manage);

    const handleClick = (doc, newValue) => {
        props.onSelect(doc, newValue);
    };
    return (
        <div
            style={{
                height: "80vh",
                overflow: "auto"
            }}
        >
            {completed.length !== 0 ? (
                completed.map((doc, index) => {
                    return (
                        <Fade in={true} timeout={500} key={index}>
                            <ButtonBase
                                style={{
                                    width: "100%",
                                    marginBottom: "10px"
                                }}
                                onClick={() => handleClick(doc, 1)}
                            >
                                <Paper
                                    style={{
                                        padding: "10px 5px",
                                        width: "100%"
                                    }}
                                >
                                    <Grid
                                        container
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <Grid item xs={2}>
                                            <Typography variant="body2">
                                                {index}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="body2">
                                                {new Date(
                                                    doc.completedAt
                                                ).toLocaleDateString()}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="body2">
                                                {new Date(
                                                    doc.completedAt
                                                ).getHours()}
                                                :
                                                {new Date(
                                                    doc.completedAt
                                                ).getMinutes()}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="body2">
                                                金額：{doc.costSum}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </ButtonBase>
                        </Fade>
                    );
                })
            ) : (
                <Paper
                    style={{
                        height: "80vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Typography>暫無訂單</Typography>
                </Paper>
            )}
        </div>
    );
};

export default CompletedTable;
