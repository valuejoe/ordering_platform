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
    Collapse
} from "@material-ui/core";
import SelectCategory from "./selectCategory";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditMenu from "./EditMenu";
import { selectEditMenuAction } from "../../store/action/UIActions";
import transitions from "@material-ui/core/styles/transitions";

const ManageList = () => {
    const { category, product } = useSelector(state => state.manage);
    const [select, setSelect] = useState("");

    useEffect(() => {
        if (select === "") setSelect(category[0] ? category[0].name : "");
    }, [category]);
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
    const dispatch = useDispatch();
    const { editMenu } = useSelector(state => state.UI);
    const handleClickEdit = e => {
        dispatch(selectEditMenuAction(e));
    };
    return (
        <React.Fragment>
            <Fade in={true} timeout={500}>
                <Paper style={{ padding: "2%", marginBottom: "5px" }}>
                    {editMenu === menuData._id ? (
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

export default ManageList;
