class ApiError extends Error{
    constructor(message, code=500){
        super(message);
        this.name = 'ApiError';
        this.code = code;
    }
}

function handler(fn){
    return async (req, res, next)=>{
        try{
            await fn(req, res, next);
        }catch(err){
            next(err);
        }
    };
}

async function saveWithError(obj){
    try{
        await obj.save();
    }catch(ve){
        if(ve.name !== "ValidationError") throw ve;
        throw new ApiError(ve.message);
    }
}


module.exports = {
    ApiError,
    handler,
    saveWithError
};
