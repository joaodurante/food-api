import * as jestcli from 'jest-cli';
import { environment } from './common/environment';
import { Server } from './server/server';
import { User } from './users/users-model';
import { Review } from './reviews/reviews-model';
import { Restaurant } from './restaurants/restaurants-model';

let server: Server;

const beforeTests = async () => {
    try {
        environment.db.url = process.env.DB_URL || 'mongodb://localhost:27017/meat-api-test';
        environment.server.port = process.env.SERVER_PORT || 3001;
        server = new Server();
        await server.bootstrap();
        User.deleteMany({}).exec();
        Review.deleteMany({}).exec();
        Restaurant.deleteMany({}).exec();
    } catch (err) {
        console.log(err);
    }
}

const afterTests = async () => {
    return server.shutdown();
}

beforeTests()
    .then(() => jestcli.run())
    .then(() => afterTests())
    .catch(console.error);