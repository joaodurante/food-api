import * as httpErrors from 'httperrors';

const authorize = (...profiles: string[]) => {
    return (req, res, next) => {
        if(req.authenticated !== undefined && req.authenticated.hasAny(...profiles))
            next();
        else
            next(new httpErrors.Forbidden('Permission denied'));
    }
}

const authorizeSelf = (...profiles: string[]) => {
    return (req, res, next) => {
        if(req.authenticated !== undefined){
            if(req.authenticated._id.equals(req.params.id) || req.authenticated.hasAny(...profiles))
                return next();
        }
        next(new httpErrors.Forbidden('Permission denied'));
    }
}

export { authorize, authorizeSelf };

