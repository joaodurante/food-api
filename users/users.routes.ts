import * as httpErrors from 'httperrors';
import * as express from 'express';
import { server } from '../index';
import { User } from './users.model';
import { render } from '../common/common';

const router = express.Router();

router.get('/', (req, res, next) => {
    User.find()
        .then(render(res, next))
        .catch(next);
});


router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(render(res, next))
        .catch(next);
});

router.post('/', (req, res, next) => {
    let user = new User(req.body);
    user.save()
        .then(user => {
            user.password = undefined;
            return user;
        })
        .then(render(res, next))
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    User.replaceOne({ _id: req.params.id }, req.body).exec()
        .then(result => {
            if (result.n)
                return User.findById(req.params.id);
            else
                throw new httpErrors.NotFound('The thing you were looking for was not found');
        })
        .then(render(res, next))
        .catch(next);
});

router.patch('/:id', (req, res, next) => {
    const options = { new: true, useFindAndModify: false };
    User.findOneAndUpdate({ _id: req.params.id }, req.body, options)
        .then(render(res, next))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => {
            if (result.n)
                res.status(204);
            else
                throw new httpErrors.NotFound('The thing you were looking for was not found');
            return next();
        }).catch(next);
});

export { router as usersRouter };