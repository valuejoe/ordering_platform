import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Button,
    Paper,
    Grid,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ButtonBase
} from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

const useStyle = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3),
        marginTop: "2%"
    }
}));

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

const AddCategory = () => {
    const [newCategory, setNewCategory] = useState("");
    const classes = useStyle();
    return (
        <Paper className={classes.paper}>
            <form>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item xs={8}>
                        <TextField
                            id="title"
                            label="分類"
                            value={newCategory}
                            fullWidth
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

const AddList = () => {
    const classes = useStyle();
    const [newFile, setNewFile] = useState({
        selectedFile: null,
        fileName: "上傳照片"
    });
    const [newData, setNewData] = useState({ title: "", cost: "" });

    const handleChange = e => {
        setNewData({ ...newData, [e.target.id]: e.target.value });
    };

    const handleselectedFile = e => {
        setNewFile({
            selectedFile: e.target.files[0],
            fileName: e.target.files[0].name
        });
    };
    console.log(newFile);

    const handleSubmit = e => {
        e.preventDefault();
        setNewData({ title: "", cost: "" });
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
                                    label="商品名稱"
                                    value={newData.title}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="cost"
                                    label="金額"
                                    value={newData.cost}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <UploadImag
                                    onSelectFile={handleselectedFile}
                                    fileName={newFile.fileName}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl style={{ minWidth: "150px" }}>
                                    <InputLabel htmlFor="age-simple">
                                        選擇分類
                                    </InputLabel>
                                    <Select
                                        value={10}
                                        inputProps={{
                                            name: "category",
                                            id: "category"
                                        }}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
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
