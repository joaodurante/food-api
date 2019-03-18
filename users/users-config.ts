import * as express from 'express';
import { User } from './users-model';
import { UsersRoutes } from './user-routes';

const router = express.Router();
const mRoutes = new UsersRoutes(User);

router.get('/', [mRoutes.findByEmail, mRoutes.findAll]);
router.get('/:id', [mRoutes.validateId, mRoutes.findOne]);
router.post('/', mRoutes.insert);
router.put('/:id', [mRoutes.validateId, mRoutes.findAndReplace]);
router.patch('/:id', [mRoutes.validateId, mRoutes.findAndUpdate]);
router.delete('/:id', [mRoutes.validateId, mRoutes.findAndDelete]);

export { router as usersRouter };