import * as httpErrors from 'httperrors';
import * as express from 'express';
import { User } from './users-model';
import { ModelRoutes } from '../common/model-routes';

const router = express.Router();
const mRoutes = new ModelRoutes(User); /* Classe que contém as operações das rotas (findAll, insert, etc) */

const findByEmail = async (req, res, next) => {
    if (req.query.email) {
        let document = await User.findByEmail(req.query.email)
        if (document)
            res.json(document);
        else 
            throw new httpErrors.NotFound('The thing you were looking for was not found');
        return next();
    }else
        next();
}

router.get('/', [findByEmail, mRoutes.findAll]);
router.get('/:id', [mRoutes.validateId, mRoutes.findOne]);
router.post('/', mRoutes.insert);
router.put('/:id', [mRoutes.validateId, mRoutes.findAndReplace]);
router.patch('/:id', [mRoutes.validateId, mRoutes.findAndUpdate]);
router.delete('/:id', [mRoutes.validateId, mRoutes.findAndDelete]);

export { router as usersRouter };