import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Paper,
    Grid,
    Typography,
    Fade,
    IconButton,
    TextField
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import { selectEditAction } from "../../store/action/UIActions";
import { updateCategoryAction } from "../../store/action/manageAction";

const TableTitle = () => {
    return (
        <Paper style={{ padding: "1% 2%", marginBottom: "5px" }}>
            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={4}>
                    <Typography variant="overline">順序</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="overline">分類名稱</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

const TableItem = props => {
    const { categoryData, index } = props;
    const dispatch = useDispatch();
    const { edit } = useSelector(state => state.UI);
    const handleClickEdit = e => {
        dispatch(selectEditAction(e));
    };
    return (
        <React.Fragment>
            <Fade in={true} timeout={500}>
                <Paper style={{ padding: "2%", marginBottom: "5px" }}>
                    {edit === categoryData._id ? (
                        <CategoryEdit
                            categoryData={categoryData}
                            index={index}
                            close={handleClickEdit}
                        />
                    ) : (
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item xs={4}>
                                {index + 1}
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>{categoryData.name}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        handleClickEdit(categoryData._id)
                                    }
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
            </Fade>
        </React.Fragment>
    );
};

const CategoryEdit = props => {
    const { categoryData, index, close } = props;
    const dispatch = useDispatch();
    const [editData, setEditData] = useState(categoryData);

    const handleChange = e => {
        setEditData({ ...editData, name: e.target.value });
    };
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateCategoryAction(editData));
    };
    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify="center" alignItems="center" spacing={1}>
                <Grid item xs={4}>
                    {index + 1}
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        value={editData.name}
                        name="name"
                        fullWidth
                        style={{ maxWidth: "100px" }}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <IconButton size="small" onClick={() => close(false)}>
                        <HighlightOffRoundedIcon />
                    </IconButton>
                    <IconButton size="small" type="submit">
                        <CheckCircleOutlineRoundedIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </form>
    );
};

function CategoryList() {
    const { category } = useSelector(state => state.manage);
    return (
        <div>
            <TableTitle />
            {category &&
                category.map((doc, index) => (
                    <TableItem key={index} categoryData={doc} index={index} />
                ))}
        </div>
    );
}

export default CategoryList;
