import React from "react";
import PropTypes from 'prop-types';

import { withStyles, withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import 'react-vis/dist/style.css';
import {FlexibleXYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: theme.spacing.unit,
    }
});

function sizing(size){
    if(size == "LARGE"){
        return {xs: 12, sm: 12, md: 12, xl: 12};
    }
    if(size == "MEDIUM"){
        return {xs: 12, sm: 12, md: 8, xl: 6};
    }
    return {xs: 12, sm: 6, md: 4, xl: 3};
}

function Dashboard(props){
    const data = [
      {x: 1, y: 12},
      {x: 2, y: 14},
      {x: 3, y: 30},
      {x: 4, y: 0},
      {x: 5, y: 10},
    ];
    const {classes, theme, width} = props;
    const s = ["LARGE", "MEDIUM", "SMALL", "SMALL", "SMALL"];
    return (
        <Grid container className={classes.root} spacing={16}>
            {[...Array(5).keys()].map(i=>(
                <Grid item key={i} style={{height:'250px'}} {...sizing(s[i])}>
                    <Paper className={classes.paper}>
                        <FlexibleXYPlot margin={{left: 25, right: 25, top: 10, bottom: 25}}>
                            <VerticalGridLines/>
                            <HorizontalGridLines/>
                            <XAxis title="time"/>
                            <YAxis title="temp (°C)"/>
                            <LineSeries data={data} color={theme.palette.primary.main} />
                        </FlexibleXYPlot>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}

export default withStyles(styles)(withTheme()(Dashboard));
