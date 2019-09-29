import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper, Grid } from "@material-ui/core";
import { Container, FormControl, InputLabel, Select } from "@material-ui/core";
import { MenuItem, ButtonBase, InputAdornment } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import {
    addCategoryAction,
    addMenuAction
} from "../../store/action/manageAction";
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
        setNewCategory("");
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
                            error={errors.name ? true : false}
                            helperText={errors.name}
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

const SelectCategory = props => {
    const { category } = useSelector(state => state.manage);
    const { newData, errors } = props;
    const handleChange = e => {
        props.onSelect(e);
    };
    return (
        <FormControl
            style={{ minWidth: "150px" }}
            error={errors.category ? true : false}
        >
            <InputLabel htmlFor="age-simple">選擇分類</InputLabel>
            <Select
                value={newData.category}
                onChange={handleChange}
                inputProps={{
                    id: "category",
                    name: "category"
                }}
            >
                {category &&
                    category.map((doc, index) => (
                        <MenuItem key={index} value={doc.name}>
                            {doc.name}
                        </MenuItem>
                    ))}
            </Select>
            <FormHelperText color="error">{errors.category}</FormHelperText>
        </FormControl>
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
        setNewData({ title: "", cost: "", category: "" });
        setNewFile({
            selectedFile: null,
            fileName: "上傳照片"
        });
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
        console.log(newData);
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
                                    newData={newData}
                                    onSelect={handleChange}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
