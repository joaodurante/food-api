import * as express from 'express';
import * as httpErrors from 'httperrors';

class Common{
    render(res: express.Response, next: express.NextFunction){
        return document => {
            if (document) {
                res.status(200).json(document);
            } else {
                throw new httpErrors.NotFound('The thing you were looking for was not found');
            }
            return next();
        }
    }
}

export { Common };