const express = require('express');
const {ApiError, handler, saveWithError} = require('./api-utils');
const Dashboard = require('../models/dashboard');

const router = express.Router();

// list all dashboards
router.get('/', handler(async (req, res)=>{
    const dashboards = await Dashboard.find({}, null, {lean : true});
    res.json({
        dashboards
    });
}));

// create one dashboards
router.post('/', handler(async (req, res)=>{
    // fields
    const name = req.body.name;

    const dashboard = new Dashboard({
        name
    });
    await saveWithError(dashboard);

    res.json({
        dashboard
    });
}));

// get one dashboard
router.get('/:dashboardId', handler(async (req, res)=>{
    // params
    const dashboardId = req.params.dashboardId;

    const dashboard = await Dashboard.findOne({_id : dashboardId}, null, {lean : true});
    if(!dashboard){
        throw new ApiError('Dashboard not found', 404);
    }

    res.json({
        dashboard
    });
}));

// patch one dashboard
router.patch('/:dashboardId', handler(async (req, res)=>{
    // params
    const dashboardId = req.params.dashboardId;
    // fields
    const name = req.body.name;

    const dashboard = await Dashboard.findOne({_id : dashboardId});
    if(!dashboard){
        throw new ApiError('Dashboard not found', 404);
    }

    if(name !== undefined) dashboard.set({name});
    await saveWithError(dashboard);

    res.json({
        dashboard
    });
}));

// delete one dashboard
router.delete('/:dashboardId', handler(async (req, res)=>{
    // params
    const dashboardId = req.params.dashboardId;

    const dashboard = await Dashboard.findOneAndDelete({_id : dashboardId});
    if(!dashboard){
        throw new ApiError('Dashboard not found', 404);
    }

    res.json({
        message : 'Dashboard deleted'
    });
}));

module.exports = router;
