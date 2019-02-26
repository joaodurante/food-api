import * as express from 'express';

export const errorHandler = (err, req, res, next) => {
    switch(err.name){
        case 'MongoError':
            if(err.code === 11000)
                err.statusCode = 400;
            break;
        case 'ValidationError':
            err.statusCode = 400;
            break;
        default:
            err.statusCode = 500;
    }

    return res.status(err.statusCode)
        .json({
            name: err.name,
            status: err.statusCode,
            message: err.message
        });
}
