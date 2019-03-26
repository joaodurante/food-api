import * as express from 'express';
import { Restaurant } from './restaurants-model';
import { RestaurantsRoutes } from './restaurants-routes';
import { authorize } from '../security/authz-handler';

const router = express.Router();
const mRoutes = new RestaurantsRoutes(Restaurant); /* Classe que contém as operações das rotas (findAll, insert, etc) */


router.get('/', mRoutes.findAll);
router.get('/:id', [mRoutes.validateId, mRoutes.findOne]);
router.post('/', [authorize('admin'), mRoutes.insert]);
router.put('/:id', [authorize('admin'), mRoutes.validateId, mRoutes.findAndReplace]);
router.patch('/:id', [authorize('admin'), mRoutes.validateId, mRoutes.findAndUpdate]);
router.delete('/:id', [authorize('admin'), mRoutes.validateId, mRoutes.findAndDelete]);
router.get('/:id/menu', [mRoutes.validateId, mRoutes.findMenu]);
router.put('/:id/menu', [authorize('admin'), mRoutes.validateId, mRoutes.replaceMenu]);

export { router as restaurantsRouter };