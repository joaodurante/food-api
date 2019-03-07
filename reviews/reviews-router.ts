import * as httpErrors from 'httperrors';
import * as express from 'express';
import { ModelRoutes } from '../common/model-routes';
import { Review } from './reviews-model';

const router = express.Router();
const mRoutes = new ModelRoutes(Review);

const findById = (req, res, next) => {
    Review.findById(req.params.id)
        .populate('user', 'name')
        .populate('restaurant', 'name')
        .then(this.render(res, next))
        .catch(next);
}

router.get('/', mRoutes.findAll);
router.get('/:id', [mRoutes.validateId, findById]);
router.post('/', mRoutes.insert);

export { router as reviewsRouter };