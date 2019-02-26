import * as express from 'express';
import { server } from '../index';
import { usersRouter } from '../users/users.routes';
import { errorHandler } from '../common/error.handler';

export function registerRoutes(){
    server.app.use('/users', usersRouter);
    server.app.use(errorHandler);
}