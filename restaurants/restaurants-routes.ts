import * as httpErrors from 'httperrors';
import * as express from 'express';
import { server } from '../index';
import { Restaurant } from './restaurants-model';
import { render } from '../common/common-functions';
import { ModelRoutes } from '../common/model-routes';

const router = express.Router();
const mRoutes = new ModelRoutes(Restaurant); /* Classe que contém as operações das rotas (findAll, insert, etc) */

const findMenu = (req, res, next) => {
    Restaurant.findById(req.params.id, '+menu')
        .then(document => {
            if(document)
                res.json(document.menu)
            else
                throw httpErrors.NotFound('Document was not found');
            return next();
        })
        .catch(next);
}

const replaceMenu = (req, res, next) => {
    const options = {overwrite: true, new: true, runValidators: true};
    Restaurant.findById(req.params.id)
        .then(document => {
            if(document){
                document.menu = req.body;
                return document.save();
            }else
                throw httpErrors.NotFound('Document was not found');
        }).then(document => {
            res.json(document.menu);
            return next();
        })
        .catch(next);
}

router.get('/', mRoutes.findAll);
router.get('/:id', [mRoutes.validateId, mRoutes.findOne]);
router.post('/', mRoutes.insert);
router.put('/:id', [mRoutes.validateId, mRoutes.findAndReplace]);
router.patch('/:id', [mRoutes.validateId, mRoutes.findAndUpdate]);
router.delete('/:id', [mRoutes.validateId, mRoutes.findAndDelete]);
router.get('/:id/menu', [mRoutes.validateId, findMenu]);
router.put('/:id/menu', [mRoutes.validateId, replaceMenu]);

export { router as restaurantsRoutes };