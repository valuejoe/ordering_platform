import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Divider, Drawer, Hidden, IconButton } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { AppBar, Toolbar, Typography, CssBaseline } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ListIcon from "@material-ui/icons/List";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { relative } from "path";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
        position: "fixed",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1
    }
}));

function ResponsiveDrawer(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button component={Link} to="/addList">
                    <ListItemIcon>
                        <AddBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="新增菜單" />
                </ListItem>
                <ListItem button component={Link} to="/manageList">
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="菜單總覽" />
                </ListItem>
                <Divider />
                <ListItem button component={Link} to="/authManagement">
                    <ListItemIcon>
                        <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="帳號管理" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="登出" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                size="medium"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuRoundedIcon />
            </IconButton>

            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}
export default ResponsiveDrawer;
