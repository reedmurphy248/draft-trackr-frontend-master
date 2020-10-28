import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

export default function MainNav() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            <MenuItem onClick={handleMenuClose}><Link to="/main">Main Page</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to="/upload">Upload Contacts</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to="/remove">Remove Contacts</Link></MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        style={{marginLeft: "5px"}}
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-controls={menuId}
                        aria-haspopup="true" // aria and anything after it is just an extra description- no functional purpose
                        onClick={handleProfileMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h5" noWrap>
                        DraftTracker
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Button variant="contained" size="large" style={{ color: "#3f51b5", marginRight: "10px" }}>
                            Logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}
