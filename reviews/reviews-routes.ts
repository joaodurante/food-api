import { ModelRoutes } from '../common/model-routes';
import { Review } from './reviews-model';

export class ReviewsRoutes extends ModelRoutes{
    constructor(model){
        super(model);
    }

    findById = (req, res, next) => {
        Review.findById(req.params.id)
            .populate('user', 'name')
            .populate('restaurant', 'name')
            .then(document => res.json(document))
            .catch(next);
    }

    envelope(document: any): any{
        let resource = super.envelope(document);
        // restaurant id
        const restId = document.restaurant._id ? document.restaurant._id : document.restaurant;
        resource._links.restaurant = `/restaurants/${restId}`;
        return resource;
    }
}