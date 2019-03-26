import * as jwt from 'jsonwebtoken';
import { User } from '../users/users-model';
import { environment } from '../common/environment';
import * as express from 'express';

const tokenParser = (req, res, next) => {
    const token = extractToken(req);
    if(token){
        jwt.verify(token, environment.security.apiSecret, applyBearer(req, next))
    }else{
        next();
    }
}

const extractToken = (req) => {
    //authorization: bearer TOKEN
    const authorization = req.header('authorization');
    if(authorization){
        const parts: string[] = authorization.split(' ');
        if(parts.length == 2 && parts[0] === 'Bearer')
            return parts[1];
    }
    return undefined;
}

const applyBearer = (req, next): (error, decoded) => void => {
    return (error, decoded) => {
        if(decoded){
            User.findByEmail(decoded.sub).then(user => {
                if(user)
                    req.authenticated = user;
                next();
            }).catch(next);
        }else{
            next();
        }
    }
}

export { tokenParser };