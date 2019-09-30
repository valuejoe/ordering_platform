import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    Container,
    Paper,
    TextField,
    CardMedia,
    Typography,
    Grid,
    IconButton,
    Button
} from "@material-ui/core";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import SelectCategory from "./selectCategory";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import UploadImg from "./UploadImg";
const ManageList = () => {
    const { category, product } = useSelector(state => state.manage);
    const [select, setSelect] = useState(category[0] ? category[0].name : "");

    const handleSelect = e => {
        setSelect(e.target.value);
    };
    return (
        <div>
            <Container maxWidth="sm">
                <SelectCategory
                    select={select}
                    errors={false}
                    onSelect={handleSelect}
                />
                <TableTitle />
                {product &&
                    product
                        .filter(doc => doc.category === select)
                        .map(doc => <TableItem key={doc._id} menuData={doc} />)}
            </Container>
        </div>
    );
};

const TableTitle = () => {
    return (
        <Paper style={{ padding: "1% 2%", marginBottom: "5px" }}>
            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={2}>
                    <Typography variant="overline">圖片</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="overline">名稱</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="overline">金額</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="overline">分類</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};
const TableItem = props => {
    const { menuData } = props;
    const [edit, setEdit] = useState(false);
    const handleClickEdit = e => {
        setEdit(e);
    };
    return (
        <Paper style={{ padding: "2%", marginBottom: "5px" }}>
            {edit ? (
                <EditMenu menuData={menuData} close={handleClickEdit} />
            ) : (
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item xs={2}>
                        <CardMedia
                            component="img"
                            alt="炸雞排"
                            height="50"
                            width="50"
                            image={`http://localhost:3030/public/${menuData._id}.jpg`}
                            title="炸雞排"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>{menuData.title}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>{menuData.cost}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>{menuData.category}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton
                            size="small"
                            onClick={() => handleClickEdit(true)}
                        >
                            <EditOutlinedIcon />
                        </IconButton>
                        <IconButton size="small">
                            <DeleteOutlinedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            )}
        </Paper>
    );
};

const EditMenu = props => {
    const { title, cost, category } = props.menuData;
    const [editData, setEditData] = useState({
        title: title,
        cost: cost,
        category: category
    });
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
    return (
        <React.Fragment>
            <form>
                <Grid container spacing={2} alignItems="center">
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
                        <Button color="primary" variant="contained" fullWidth>
                            確定
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};
export default ManageList;
