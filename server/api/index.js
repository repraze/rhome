const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

class ApiError extends Error{
    constructor(message, code=500){
        super(message);
        this.name = 'ApiError';
        this.code = code;
    }
}

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/', (req, res)=>{
    res.json({
        message : "Welcome to RHome API"
    });
});

// endpoints
router.use('/dashboards/', require('./dashboards'));
router.use('/things/', require('./things'));

// error
router.use('*', (req, res, next)=>{
    next(new ApiError('Endpoint not found', 404));
});

router.use((err, req, res, next)=>{
    console.error(err.stack);
    if(err instanceof ApiError){
        res.status(err.code).json({
            message : err.message
        });
    }else{
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
});

module.exports = router;
