import * as express from 'express';
import { User } from './users-model';
import { UsersRoutes } from './user-routes';
import { authorize, authorizeSelf } from '../security/authz-handler';

const router = express.Router();
const mRoutes = new UsersRoutes(User);

router.get('/', [authorize('admin'), mRoutes.findByEmail, mRoutes.findAll]);
router.get('/:id', [authorizeSelf('admin'), mRoutes.validateId, mRoutes.findOne]);
router.post('/', [authorize('admin'), mRoutes.insert]);
router.post('/authenticate', mRoutes.authenticate);
router.put('/:id', [authorizeSelf('admin'), mRoutes.validateId, mRoutes.findAndReplace]);
router.patch('/:id', [authorizeSelf('admin'), mRoutes.validateId, mRoutes.findAndUpdate]);
router.delete('/:id', [authorizeSelf('admin'), mRoutes.validateId, mRoutes.findAndDelete]);

export { router as usersRouter };