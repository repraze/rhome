import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    show: {
        transform: 'translateY(0)',
        transition: 'transform .25s',
    },
    hide: {
        transform: 'translateY(-110%)',
        transition: 'transform .25s',
    },
});

class TopBar extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            shouldShow: true,
        };
        this.lastScroll = window.scrollY;
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll(event){
        const scroll = window.scrollY;
        if(scroll === this.lastScroll){
            return;
        }
        const shouldShow = scroll < 64 || scroll < this.lastScroll;
        if (shouldShow !== this.state.shouldShow) {
            this.setState((prevState, props)=>({
                ...prevState,
                shouldShow,
            }));
        }
        this.lastScroll = scroll;
    }
    render(){
        const {classes, className, isStatic, children} = this.props;
        const {shouldShow} = this.state;
        const show = isStatic || shouldShow;
        return (
            <AppBar
                position="fixed"
                className={classNames(className, classes.root, show ? classes.show : classes.hide)}>
                {children}
            </AppBar>
        );
    }
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    isStatic: PropTypes.bool
};

export default withStyles(styles)(TopBar);
