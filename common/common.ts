import * as express from 'express';
import * as httpErrors from 'httperrors';

const render = (res: express.Response, next: express.NextFunction) => {
    return document => {
        if (document) {
            res.json(document);
        } else {
            throw new httpErrors.NotFound('The thing you were looking for was not found');
        }
        return next();
    }
}

export { render };