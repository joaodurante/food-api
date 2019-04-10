import * as httpErrors from 'httperrors';
import { log } from '../common/logger';

const authorize = (...profiles: string[]) => {
    return (req, res, next) => {
        if(req.authenticated !== undefined && req.authenticated.hasAny(...profiles)){
            log(`User ${req.authenticated._id} is authorized with profiles [${req.authenticated.profiles}].`);
            next();
        }else{
            if(req.authenticated !== undefined)
                log(`User ${req.authenticated._id} is not authorized with profiles [${req.authenticated.profiles}]. Required profiles [${profiles}]`);
            next(new httpErrors.Forbidden('Permission denied'));
        }
    }
}

const authorizeSelf = (...profiles: string[]) => {
    return (req, res, next) => {
        if(req.authenticated !== undefined && (req.authenticated._id.equals(req.params.id) || req.authenticated.hasAny(...profiles))){
            log(`User ${req.authenticated._id} is authorized with profiles [${req.authenticated.profiles}].`);
            next();
        }else{
            log(`User ${req.authenticated._id} is not authorized with profiles [${req.authenticated.profiles}]. Required profiles ${[profiles]}`);
            next(new httpErrors.Forbidden('Permission denied'));
        }  
    }
}

export { authorize, authorizeSelf };

