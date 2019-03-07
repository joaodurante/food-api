import { Restaurant } from './restaurants-model';
import { ModelRoutes } from '../common/model-routes';
import * as httpErrors from 'httperrors';

export class RestaurantsRoutes extends ModelRoutes{
    constructor(model){
        super(model);
    }

    findMenu = async (req, res, next) => {
        try {
            let document = await Restaurant.findById(req.params.id, '+menu');
            if (document)
                res.json(document.menu);
            else
                throw httpErrors.NotFound('Document was not found');
            next();
        } catch (err) {
            next(err);
        }
    }
    
    replaceMenu = async (req, res, next) => {
        try {
            let query = await Restaurant.findById(req.params.id);
            if (query) {
                query.menu = req.body;
                let document = await query.save();
                res.json(document.menu);
                next();
            }
        } catch (err) {
            next(err);
        }
    }

    envelope(document: any): any{
        let resource = super.envelope(document);
        resource._links.menu = `${this.basePath}/${resource._id}/menu`;
        return resource;
    }
}