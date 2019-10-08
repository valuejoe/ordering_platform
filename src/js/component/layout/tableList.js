import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Container, Hidden, Grid, Typography } from "@material-ui/core";
import { Tab, Tabs, AppBar } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

function TableList({ TableChildren, ContentChildren }) {
    const theme = useTheme();
    const [select, setSelect] = useState("");
    const [value, setValue] = useState(0);
    const handleSelect = (e, newValue) => {
        setSelect(e);
        setValue(newValue);
    };
    const handleChange = (e, newValue) => {
        e.preventDefault();
        console.log(e);
        setValue(newValue);
    };
    const handleChangeIndex = e => {
        setValue(e);
    };
    return (
        <div>
            <Container maxWidth="md" style={{ height: "80vh", flexGrow: 1 }}>
                <Hidden smDown>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TableChildren onSelect={handleSelect} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ContentChildren
                                select={select}
                                onSelect={handleSelect}
                            />
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden mdUp>
                    <SwipeableViews
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <Typography component="div" dir={theme.direction}>
                            <TableChildren onSelect={handleSelect} />
                        </Typography>
                        <Typography component="div" dir={theme.direction}>
                            <ContentChildren
                                select={select}
                                onSelect={handleSelect}
                            />
                        </Typography>
                    </SwipeableViews>
                    <AppBar
                        position="sticky"
                        style={{ flexGrow: 1, top: "auto", bottom: 0 }}
                    >
                        <Tabs
                            indicatorColor="primary"
                            centered
                            variant="fullWidth"
                            onChange={handleChange}
                            value={value}
                        >
                            <Tab value={0} label="清單" />
                            <Tab value={1} label="詳細" />
                        </Tabs>
                    </AppBar>
                </Hidden>
            </Container>
        </div>
    );
}

export default TableList;
