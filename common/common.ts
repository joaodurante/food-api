import * as express from 'express';
import * as httpErrors from 'httperrors';

class Common{
    render(res: express.Response, next: express.NextFunction){
        return document => {
            if (document) {
                res.status(200)
                    .json(this.envelope(document));
            } else {
                throw new httpErrors.NotFound('The thing you were looking for was not found');
            }
            return next();
        }
    }

    renderAll(res: express.Response, next: express.NextFunction){
        return (documents => {
            if(documents){
                documents.forEach((document, index, array) => {
                    array[index] = this.envelope(document);
                })
                res.json(documents);
            }else
                return res.json([]);
        })
    }

    envelope(document: any): any{
        return document;
    }
}

export { Common };