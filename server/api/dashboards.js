const express = require('express');
const router = express.Router();

// list all dashboards
router.get('/', async (req, res)=>{

});

// create one dashboards
router.post('/', async (req, res)=>{

});

// get one dashboard
router.get('/:dashboardId', async (req, res)=>{
    const dashboardId = req.params.dashboardId;
});

// patch one dashboard
router.patch('/:dashboardId', async (req, res)=>{
    const dashboardId = req.params.dashboardId;
});

// delete one dashboard
router.delete('/:dashboardId', async (req, res)=>{
    const dashboardId = req.params.dashboardId;
});

module.exports = router;
