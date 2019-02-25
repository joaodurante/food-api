import { server } from '../index';
import * as express from 'express';
import { User } from './users.model';

const router = express.Router();
const path = '/users';

export function usersRoutes() {
    server.app.use(path, router);

    router.get('/', (req, res, next) => {
        User.find().then(users => {
            res.json(users);
            return next();
        })
    });

    router.get('/:id', (req, res, next) => {
        User.findById(req.params.id).then(user => {
            if (user) {
                res.json(user);
                return next();
            } else {
                res.status(404);
                res.json({ error: 'Error 404 not found' });
                return next();
            }
        })
    });

    router.post('/', (req, res, next) => {
        let user = new User(req.body);
        user.save().then(user => {
            user.password = undefined;
            res.json(user);
            return next();
        })
    });

    router.put('/:id', (req, res, next) => {
        User.replaceOne({ _id: req.params.id }, req.body).exec()
            .then(result => {
                if (result.n) {
                    return User.findById(req.params.id);
                } else {
                    res.send(404);
                }
            }).then(user => {
                res.json(user);
                return next();
            })
    });

    router.patch('/:id', (req, res, next) => {
        const options = { new: true, useFindAndModify: false };
        User.findOneAndUpdate({_id: req.params.id}, req.body, options)
            .then(user => {
                if (user)
                    res.json(user);
                else
                    res.status(404);
                return next();
            })
    });

    router.delete('/:id', (req, res, next) => {
        User.deleteOne({_id: req.params.id}).then(result => {
            if(result.n){
                res.status(204);
            }else{
                res.status(404);
            }
            return next();
        })
    })
}