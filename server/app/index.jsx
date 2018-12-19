import ReactDOM from 'react-dom'
import React from "react";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MetaTags from 'react-meta-tags';

import { withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button';

import CoreLayout from './layouts/core-layout';
import Dashboard from './views/dashboard';

function Home(props){
    return (
        <div>
            <p>Hello</p>
        </div>
    );
}

Home.title = "Home";

const App = withTheme()(function(props){
    const {theme} = props;
    return (
        <React.Fragment>
            <CssBaseline />
            <MetaTags>
                <title>RHome</title>
                <meta name="theme-color" content={theme.palette.primary.dark}/>
            </MetaTags>
            <CoreLayout>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/dashboards' component={Dashboard}/>
                    </Switch>
                </Router>
            </CoreLayout>
        </React.Fragment>
    );
});

export default function rhome(element){
    ReactDOM.render(<App/>, element);
}

if(window){
    window.rhome = rhome;
}
