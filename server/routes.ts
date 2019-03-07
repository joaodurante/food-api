import { server } from '../index';
import { usersRouter } from '../users/users-config';
import { restaurantsRouter } from '../restaurants/restaurants-config';
import { reviewsRouter } from '../reviews/reviews-config';
import { errorHandler } from '../common/error-handler';
import { environment } from '../common/environment';

export function registerRoutes(){
    server.app.use('/users', usersRouter);
    server.app.use('/restaurants', restaurantsRouter);
    server.app.use('/reviews', reviewsRouter);
    server.app.use(errorHandler);
}