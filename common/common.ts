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
            return next(false);
        }
    }

    renderAll(res: express.Response, next: express.NextFunction, options: any = {}){
        return (documents => {
            if(documents){
                documents.forEach((document, index, array) => {
                    array[index] = this.envelope(document);
                })
                res.json(this.envelopeAll(documents, options));
            }else
                return res.json(this.envelopeAll([], options));
            return next(false);
        })
    }

    envelope(document: any): any{
        return document;
    }

    envelopeAll(documents: any[], options: any = {}): any{
        return documents;
    }
}

export { Common };