const express = require('express');
const bodyParser = require('body-parser');
const {ApiError} = require('./api-utils');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// endpoints
router.get('/', (req, res)=>{
    res.json({
        message : "Welcome to RHome API"
    });
});

router.use('/dashboards/', require('./dashboards'));
router.use('/things/', require('./things'));

router.use((req, res, next)=>{
    next(new ApiError('Endpoint not found', 404));
});

// error handling
router.use((err, req, res, next)=>{
    if(err instanceof ApiError){
        res.status(err.code).json({
            message : err.message
        });
    }else{
        console.error(err.stack);
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
});

module.exports = router;
