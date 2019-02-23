import { server } from '../index';
import * as express from 'express';
import { User } from './users.model';

const router = express.Router();
const path = '/users';

export function usersRoutes(){
    server.app.use(path, router);

    router.get('/', (req, res, next) => {
        User.findAll().then(users => {
            res.json(users);
            return next();
        })
    });

    router.get('/:id', (req, res, next) => {
        User.findById(req.params.id).then(user => {
            if(user){
                res.json(user);
                return next();
            }else{
                res.status(404);
                res.json({error: 'Error 404 not found'});
                return next();
            }
        })
    })
}