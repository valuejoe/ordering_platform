import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Grid, Button } from "@material-ui/core";
import SelectCategory from "./selectCategory";
import CategoryList from "./CategoryList";
import MenuList from "./MenuList";

const ManageList = () => {
    const { category } = useSelector(state => state.manage);
    const [select, setSelect] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (select === "") setSelect(category[0] ? category[0]._id : "");
    }, [category]);

    const handleSelect = e => {
        setSelect(e.target.value);
    };

    const handleOpenClick = e => {
        setOpen(!open);
    };

    return (
        <div>
            <Container maxWidth="sm">
                <Grid container justify="flex-start" alignItems="center">
                    <Grid item xs={4}>
                        <SelectCategory
                            select={select}
                            errors={false}
                            onSelect={handleSelect}
                        />
                    </Grid>
                    <Button
                        variant="outlined"
                        style={{ marginLeft: "10px" }}
                        onClick={handleOpenClick}
                    >
                        {open ? "菜單列表" : "分類列表"}
                    </Button>
                </Grid>
                {open ? <CategoryList /> : <MenuList select={select} />}
            </Container>
        </div>
    );
};

export default ManageList;
