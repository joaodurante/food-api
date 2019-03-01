import * as express from 'express';
import { server } from '../index';
import { usersRoutes } from '../users/users-routes';
import { restaurantsRoutes } from '../restaurants/restaurants-routes';
import { errorHandler } from '../common/error-handler';

export function registerRoutes(){
    server.app.use('/users', usersRoutes);
    server.app.use('/restaurants', restaurantsRoutes);
    server.app.use(errorHandler);
}