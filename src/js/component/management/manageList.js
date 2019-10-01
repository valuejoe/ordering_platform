import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Paper,
    TextField,
    CardMedia,
    Typography,
    Grid,
    IconButton,
    Fade,
    Button
} from "@material-ui/core";
import SelectCategory from "./selectCategory";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditMenu from "./EditMenu";
import { selectEditAction } from "../../store/action/UIActions";
import CategoryList from "./CategoryList";

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
    console.log(menuData);
    category = category.find(doc => doc._id === menuData.category).name;
    const handleClickEdit = e => {
        dispatch(selectEditAction(e));
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

const ManageList = () => {
    const { category, product } = useSelector(state => state.manage);
    const [select, setSelect] = useState("");
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        console.log(category);
        if (select === "") setSelect(category[0] ? category[0]._id : "");
    }, [category]);
    const handleSelect = e => {
        setSelect(e.target.value);
    };
    const handleEditClick = e => {
        setEdit(e);
    };
    return (
        <div>
            <Container maxWidth="sm">
                <Grid container justify="flex-start" alignItems="center">
                    <SelectCategory
                        select={select}
                        errors={false}
                        onSelect={handleSelect}
                    />
                    <Button
                        variant="outlined"
                        style={{ marginLeft: "10px" }}
                        onClick={() => handleEditClick(true)}
                    >
                        編輯分類
                    </Button>
                </Grid>
                <CategoryList />
                <MenuTableTitle />
                {product &&
                    product
                        .filter(doc => doc.category === select)
                        .map(doc => (
                            <MenuTableItem key={doc._id} menuData={doc} />
                        ))}
            </Container>
        </div>
    );
};

export default ManageList;
