import * as express from 'express';
import { ReviewsRoutes } from './reviews-routes';
import { Review } from './reviews-model';
import { authorize } from '../security/authz-handler';

const router = express.Router();
const mRoutes = new ReviewsRoutes(Review);

router.get('/', authorize('user'), mRoutes.findAll);
router.get('/:id', [authorize('user'), mRoutes.validateId, mRoutes.findById]);
router.post('/', [authorize('user'), mRoutes.insert]);

export { router as reviewsRouter };