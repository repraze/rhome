import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import CoreMenu from './core-menu';
import CoreSideMenu from './core-side-menu';

const drawerWidth = 320;

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
    topStatic: {
        transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.leavingScreen,
        }),
        left: 0,
    },
    topStaticShift: {
        transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        left: drawerWidth,
    },
    mainStatic: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    mainStaticShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
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

        const isMenuStatic = isWidthUp('md', props.width);

        this.state = {
            isMenuOpen : isMenuStatic ? true : false
        };

        this.handleMenuToggle = this.handleMenuToggle.bind(this);
    }
    handleMenuToggle(){
        this.setState({isMenuOpen: !this.state.isMenuOpen});
    }
    render(){
        const {classes, children, width} = this.props;
        const {isMenuOpen} = this.state;
        const isMenuStatic = isWidthUp('md', width);

        return (
            <div className={classes.root}>
                <CoreSideMenu
                    onClickMenu={this.handleMenuToggle}
                    isOpen={isMenuOpen}
                    isStatic={isMenuStatic}
                    />
                <div className={classNames(classes.main, {
                        [classes.mainStatic] : isMenuStatic,
                        [classes.mainStaticShift] : isMenuStatic && isMenuOpen,
                    })}>
                    <CoreMenu
                        className={classNames({
                            [classes.topStatic] : isMenuStatic,
                            [classes.topStaticShift] : isMenuStatic && isMenuOpen,
                        })}
                        onClickMenu={this.handleMenuToggle}
                        isStatic={isMenuStatic}
                        />
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

export default withStyles(styles)(withWidth()(CoreLayout));
