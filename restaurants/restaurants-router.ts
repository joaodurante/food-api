import * as httpErrors from 'httperrors';
import * as express from 'express';
import { Restaurant } from './restaurants-model';
import { ModelRoutes } from '../common/model-routes';

const router = express.Router();
const mRoutes = new ModelRoutes(Restaurant); /* Classe que contém as operações das rotas (findAll, insert, etc) */

const findMenu = async (req, res, next) => {
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

const replaceMenu = async (req, res, next) => {
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

router.get('/', mRoutes.findAll);
router.get('/:id', [mRoutes.validateId, mRoutes.findOne]);
router.post('/', mRoutes.insert);
router.put('/:id', [mRoutes.validateId, mRoutes.findAndReplace]);
router.patch('/:id', [mRoutes.validateId, mRoutes.findAndUpdate]);
router.delete('/:id', [mRoutes.validateId, mRoutes.findAndDelete]);
router.get('/:id/menu', [mRoutes.validateId, findMenu]);
router.put('/:id/menu', [mRoutes.validateId, replaceMenu]);

export { router as restaurantsRouter };