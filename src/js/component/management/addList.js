import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper, Grid } from "@material-ui/core";
import { Container, ButtonBase, InputAdornment } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import { addCategoryAction } from "../../store/action/manageAction";
import { addMenuAction } from "../../store/action/manageAction";
import SelectCategory from "./selectCategory";

const useStyle = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3),
        marginTop: "2%"
    }
}));

const AddCategory = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const { errors, success } = useSelector(state => state.UI);
    const [newCategory, setNewCategory] = useState("");

    //if success init data
    useEffect(() => {
        if (success) setNewCategory("");
    }, [success]);

    const handleChange = e => {
        setNewCategory(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        let data = { name: newCategory };
        dispatch(addCategoryAction(data));
    };
    return (
        <Paper className={classes.paper}>
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item xs={8}>
                        <TextField
                            id="title"
                            label="分類"
                            value={newCategory}
                            fullWidth
                            onChange={handleChange}
                            error={errors.addCategory ? true : false}
                            helperText={errors.addCategory}
                            InputProps={
                                success.addCategory && {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <CheckCircleRoundedIcon
                                                style={{ color: "green" }}
                                            />
                                        </InputAdornment>
                                    )
                                }
                            }
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button type="submit" variant="outlined" fullWidth>
                            新增分類
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

const UploadImag = props => {
    const { fileName, onSelectFile } = props;

    const handleChange = e => {
        onSelectFile(e);
    };

    return (
        <React.Fragment>
            <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleChange}
            />
            <label htmlFor="raised-button-file">
                <ButtonBase component="span" style={{ height: "50px" }}>
                    <ImageOutlinedIcon fontSize="large" />
                    {fileName}
                </ButtonBase>
            </label>
        </React.Fragment>
    );
};

const AddList = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const { errors, success } = useSelector(state => state.UI);
    const [newFile, setNewFile] = useState({
        selectedFile: null,
        fileName: "上傳照片"
    });
    const [newData, setNewData] = useState({
        title: "",
        cost: "",
        category: ""
    });

    //if success init data
    useEffect(() => {
        if (success) {
            setNewData({ title: "", cost: "", category: "" });
            setNewFile({
                selectedFile: null,
                fileName: "上傳照片"
            });
        }
    }, [success]);

    const handleChange = e => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };

    const handleselectedFile = e => {
        setNewFile({
            selectedFile: e.target.files[0],
            fileName: e.target.files[0].name
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addMenuAction(newData, newFile.selectedFile));
    };

    return (
        <div>
            <Container maxWidth="sm">
                <AddCategory />
                <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="title"
                                    name="title"
                                    label="商品名稱"
                                    value={newData.title}
                                    onChange={handleChange}
                                    fullWidth
                                    error={errors.title ? true : false}
                                    helperText={errors.title}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="cost"
                                    name="cost"
                                    label="金額"
                                    value={newData.cost}
                                    onChange={handleChange}
                                    fullWidth
                                    error={errors.cost ? true : false}
                                    helperText={errors.cost}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <UploadImag
                                    onSelectFile={handleselectedFile}
                                    fileName={newFile.fileName}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SelectCategory
                                    select={newData.category}
                                    onSelect={handleChange}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Typography
                                    hidden={!errors.addMenu}
                                    color="error"
                                >
                                    {errors.addMenu}
                                </Typography>
                                <Typography hidden={!success.addMenu}>
                                    <CheckCircleRoundedIcon
                                        style={{ color: "green" }}
                                    />
                                </Typography>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    fullWidth
                                >
                                    新增菜單
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default AddList;
