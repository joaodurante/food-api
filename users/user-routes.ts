import * as httpErrors from 'httperrors';
import { User } from './users-model';
import { ModelRoutes } from '../common/model-routes';

export class UsersRoutes extends ModelRoutes{
    constructor(model){
        super(model);
    }

    findByEmail = async (req, res, next) => {
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
}