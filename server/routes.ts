import * as express from 'express';
import { server } from '../index';
import { usersRouter } from '../users/users-router';
import { restaurantsRouter } from '../restaurants/restaurants-router';
import { reviewsRouter } from '../reviews/reviews-router';
import { errorHandler } from '../common/error-handler';

export function registerRoutes(){
    server.app.use('/users', usersRouter);
    server.app.use('/restaurants', restaurantsRouter);
    server.app.use('/reviews', reviewsRouter);
    server.app.use(errorHandler);
}