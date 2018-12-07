import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import TopBar from './core-topbar';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    leftButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    rightButton: {
        marginLeft: -20,
        marginRight: -12,
    },
});

function CoreMenu(props){
    const {classes, onClickMenu} = props;
    return (
        <TopBar>
            <Toolbar>
                <IconButton className={classNames(classes.leftButton)} color="inherit" aria-label="Menu" onClick={onClickMenu}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.grow}>News</Typography>
                <IconButton className={classNames(classes.rightButton)} color="inherit" aria-label="Menu" onClick={onClickMenu}>
                    <SearchIcon/>
                </IconButton>
            </Toolbar>
        </TopBar>
    );
}

CoreMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    onClickMenu: PropTypes.func.isRequired
};

export default withStyles(styles)(CoreMenu);
