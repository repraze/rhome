import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import CoreMenu from './core-menu';
import CoreSideMenu from './core-side-menu';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        flexDirection: 'column',
        zIndex: 1
    },
    main: {
        paddingTop: 64
    },
    content: {
        // marginTop: 64,
        padding: theme.spacing.unit * 2,
        flexGrow: 1,
        position: 'relative',
        overflow: 'auto'
    }
});

class CoreLayout extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isMenuOpen : false
        };

        this.handleMenuToggle = this.handleMenuToggle.bind(this);
    }
    handleMenuToggle(){
        this.setState({isMenuOpen: !this.state.isMenuOpen});
    }
    render(){
        const {classes, children} = this.props;
        const {isMenuOpen} = this.state;

        return (
            <div className={classes.root}>
                <CoreSideMenu onClickMenu={this.handleMenuToggle} isMenuOpen={isMenuOpen}/>
                <div className={classes.main}>
                    <CoreMenu onClickMenu={this.handleMenuToggle}/>
                    <div className={classes.content}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

CoreLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CoreLayout);
