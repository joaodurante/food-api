import * as httpErrors from 'httperrors';
import * as express from 'express';
import { server } from '../index';
import { User } from './users-model';
import { render } from '../common/common-functions';
import { ModelRoutes } from '../common/model-routes';

const router = express.Router();
const mRoutes = new ModelRoutes(User); /* Classe que contém as operações das rotas (findAll, insert, etc) */

router.get('/', mRoutes.findAll);

router.get('/:id', [mRoutes.validateId, mRoutes.findOne]);

router.post('/', mRoutes.insert);

router.put('/:id', [mRoutes.validateId, mRoutes.findAndReplace]);

router.patch('/:id', [mRoutes.validateId, mRoutes.findAndUpdate]);

router.delete('/:id', [mRoutes.validateId, mRoutes.findAndDelete]);

export { router as usersRoutes };