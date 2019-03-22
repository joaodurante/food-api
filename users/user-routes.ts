import * as httpErrors from 'httperrors';
import { User } from './users-model';
import { ModelRoutes } from '../common/model-routes';
import { authenticate } from '../security/auth-handler';

export class UsersRoutes extends ModelRoutes{
    constructor(model){
        super(model);
    }

    findByEmail = async (req, res, next) => {
        if(req.query.email){
            User.findByEmail(req.query.email)
                .then(this.render(res, next))
                .catch(next);
        }else{
            next();
        }
    }

    authenticate = (req, res, next) => {
        authenticate(req, res, next);
    }
}