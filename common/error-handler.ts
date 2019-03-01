import * as express from 'express';

export const errorHandler = (err, req, res, next) => {
    const messages: any[] = [];
    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000)
                err.statusCode = 400;
            break;

        case 'ValidationError':
            err.statusCode = 400;
            break;
    }

    return res.status(err.statusCode)
        .json({
            status: err.statusCode,
            name: err.name,
            messages: err.message
        });
}
