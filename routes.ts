import * as express from 'express';
import { usersRoutes } from './users/users.routes';

export function routes(){
    usersRoutes();
}