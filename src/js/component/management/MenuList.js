import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, CardMedia, Typography, Grid } from "@material-ui/core";
import { Fade, IconButton } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditMenu from "./EditMenu";
import { selectEditAction } from "../../store/action/UIActions";
import { deleteMenuAction } from "../../store/action/manageAction";
import API_PORT from "../../route/APIport";

const MenuTableTitle = () => {
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

const MenuTableItem = props => {
    const { menuData } = props;
    const dispatch = useDispatch();
    const { edit } = useSelector(state => state.UI);
    let { category } = useSelector(state => state.manage);
    category = category.find(doc => doc._id === menuData.category).name;

    const handleClickEdit = e => {
        dispatch(selectEditAction(e));
    };

    const handleClickDelete = e => {
        dispatch(deleteMenuAction(menuData));
    };

    return (
        <React.Fragment>
            <Fade in={true} timeout={500}>
                <Paper style={{ padding: "2%", marginBottom: "5px" }}>
                    {edit === menuData._id ? (
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
                                    alt={menuData.title}
                                    height="50"
                                    width="50"
                                    image={`${API_PORT}/public/${menuData._id}.jpg`}
                                    title={menuData.title}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>{menuData.title}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{menuData.cost}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{category}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        handleClickEdit(menuData._id)
                                    }
                                >
                                    <EditOutlinedIcon />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={handleClickDelete}
                                >
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

function MenuList({ select }) {
    const { product } = useSelector(state => state.manage);

    return (
        <React.Fragment>
            <MenuTableTitle />
            {product &&
                product
                    .filter(doc => doc.category === select)
                    .map(doc => <MenuTableItem key={doc._id} menuData={doc} />)}
        </React.Fragment>
    );
}

export default MenuList;
