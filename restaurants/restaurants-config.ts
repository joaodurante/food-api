import * as httpErrors from 'httperrors';
import * as express from 'express';
import { Restaurant } from './restaurants-model';
import { RestaurantsRoutes } from './restaurants-routes';

const router = express.Router();
const mRoutes = new RestaurantsRoutes(Restaurant); /* Classe que contém as operações das rotas (findAll, insert, etc) */


router.get('/', mRoutes.findAll);
router.get('/:id', [mRoutes.validateId, mRoutes.findOne]);
router.post('/', mRoutes.insert);
router.put('/:id', [mRoutes.validateId, mRoutes.findAndReplace]);
router.patch('/:id', [mRoutes.validateId, mRoutes.findAndUpdate]);
router.delete('/:id', [mRoutes.validateId, mRoutes.findAndDelete]);
router.get('/:id/menu', [mRoutes.validateId, mRoutes.findMenu]);
router.put('/:id/menu', [mRoutes.validateId, mRoutes.replaceMenu]);

export { router as restaurantsRouter };