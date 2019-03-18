import * as express from 'express';
import { usersRouter } from '../users/users-config';
import { restaurantsRouter } from '../restaurants/restaurants-config';
import { reviewsRouter } from '../reviews/reviews-config';
import { errorHandler } from '../common/error-handler';
import { environment } from '../common/environment';

export function registerRoutes(app: express.Express){
    app.use('/users', usersRouter);
    app.use('/restaurants', restaurantsRouter);
    app.use('/reviews', reviewsRouter);
    app.use(errorHandler);
}