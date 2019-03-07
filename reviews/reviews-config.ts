import * as express from 'express';
import { ReviewsRoutes } from './reviews-routes';
import { Review } from './reviews-model';

const router = express.Router();
const mRoutes = new ReviewsRoutes(Review);

router.get('/', mRoutes.findAll);
router.get('/:id', [mRoutes.validateId, mRoutes.findById]);
router.post('/', mRoutes.insert);

export { router as reviewsRouter };