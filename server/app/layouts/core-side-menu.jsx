import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import MemoryIcon from '@material-ui/icons/Memory';

const drawerWidth = 320;

const styles = theme => ({
    drawer: {
        width: drawerWidth,
        maxWidth: '100vw',
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        maxWidth: '100vw',
    },
    grow: {
        flexGrow: 1,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    nested1: {
        paddingLeft: theme.spacing.unit * 4,
    },
    nested2: {
        paddingLeft: theme.spacing.unit * 6,
    },
    nested3: {
        paddingLeft: theme.spacing.unit * 8,
    },
});

class MenuList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isOpenByIndex : {}
        };

        this.handleCollapse = this.handleCollapse.bind(this);
    }
    handleCollapse(event, key){
        const {isOpenByIndex} = this.state;
        isOpenByIndex[key] = !isOpenByIndex[key];
        this.setState({isOpenByIndex});
    }
    render(){
        const {classes, items, level} = this.props;
        const {isOpenByIndex} = this.state;
        const className = level ? classes[`nested${level}`] : undefined;

        return (
            <List disablePadding={level>0}>
                {items.map((item, index)=>{
                    const hasItems = !!item.items;
                    const hasIcon = !!item.icon;
                    const isOpen = isOpenByIndex[index] || false;
                    const onClick = hasItems ? e=>this.handleCollapse(e, index) : item.onClick;
                    return (
                        <React.Fragment key={index}>
                            <ListItem button onClick={onClick} className={className}>
                                {hasIcon ? (
                                    <ListItemIcon><item.icon/></ListItemIcon>
                                ) : null}
                                <ListItemText primary={item.text} />
                                {hasItems ? (
                                    isOpen ? <ExpandLess /> : <ExpandMore />
                                ) : null}
                            </ListItem>
                            {hasItems ? (
                                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                    <MenuList classes={classes} items={item.items} level={level+1}/>
                                </Collapse>
                            ) : null}
                        </React.Fragment>
                    );
                })}
            </List>
        );
    }
}

MenuList.defaultProps = {
    level : 0
}

function CoreSideMenu(props){
    const {classes, isStatic, isOpen, onClickMenu, dashboards} = props;

    const dashboardItems = dashboards.map(d=>({
        text : d.name
    }));

    const items = [
        {
            text : "Dashboards",
            icon : DashboardIcon,
            items : dashboardItems
        },
        {
            text : "Logic Rules",
            icon : SettingsInputComponentIcon
        },
        {
            text : "Things",
            icon : MemoryIcon
        },
    ];

    return (
        <Drawer
            className={classes.drawer}
            anchor="left"
            variant={isStatic ? "persistent" : "temporary"}
            open={isOpen}
            onClose={onClickMenu}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar}>
                <Typography variant="h6" color="inherit" className={classes.grow}>RHome</Typography>
                <IconButton onClick={onClickMenu}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <MenuList classes={classes} items={items}/>
        </Drawer>
    );
}

CoreSideMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    isStatic: PropTypes.bool,
    isOpen: PropTypes.bool,
    onClickMenu: PropTypes.func.isRequired
};

export default withStyles(styles)(CoreSideMenu);
