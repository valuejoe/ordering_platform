import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Button, LinearProgress } from "@material-ui/core";
import SelectCategory from "./selectCategory";
import UploadImg from "./UploadImg";
import { updateMenuAction } from "../../store/action/manageAction";

const EditMenu = props => {
    const { menuData } = props;
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.UI);
    const [editData, setEditData] = useState(menuData);
    const [file, setFile] = useState({
        selectFile: null,
        fileName: "更換照片"
    });
    const handleChange = e => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };
    const handleFile = e => {
        setFile({
            selectFile: e.target.files[0],
            fileName: e.target.files[0].name
        });
    };
    const handleCancelClick = () => {
        props.close(false);
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateMenuAction(editData, file.selectFile));
    };
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                        <TextField
                            name="title"
                            value={editData.title}
                            label="商品名稱"
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="cost"
                            value={editData.cost}
                            label="金額"
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <UploadImg
                            onSelectFile={handleFile}
                            fileName={file.fileName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectCategory
                            select={editData.category}
                            errors={false}
                            onSelect={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <LinearProgress
                            style={{ width: "95%" }}
                            hidden={!loading}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleCancelClick}
                        >
                            取消
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            fullWidth
                        >
                            確定
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};

export default EditMenu;
