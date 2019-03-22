import * as express from 'express';

export const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000)
                err.statusCode = 400;
            break;

        case 'ValidationError':
            err.statusCode = 400;
            break;
    }

    const messages: any[] = [];
    for(let i in err.errors)
        messages.push({message: err.errors[i].message});
    messages.push({message: err.message});

    return res.status(err.statusCode)
        .json({
            status: err.statusCode,
            name: err.name,
            messages: messages
        });
}
