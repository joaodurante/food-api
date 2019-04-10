import * as jestcli from 'jest-cli';
import { environment } from './common/environment';
import { Server } from './server/server';
import { User } from './users/users-model';
import { Review } from './reviews/reviews-model';
import { Restaurant } from './restaurants/restaurants-model';

let server: Server;

const beforeTests = async () => {
    try {
        environment.db.url = process.env.DB_URL || 'mongodb://localhost:27017/food-api-test';
        environment.server.port = process.env.SERVER_PORT || 3001;
        server = new Server();
        await server.bootstrap();
        
        await User.deleteMany({}).exec();
        Review.deleteMany({}).exec();
        Restaurant.deleteMany({}).exec();
        createAdmin();
    } catch (err) {
        console.log(err);
    }
}

const afterTests = async () => {
    return server.shutdown();
}

const createAdmin = () => {
    let admin = new User();
        admin.name = 'admin';
        admin.email = 'admin@gmail.com';
        admin.password = '123';
        admin.profiles = ['admin', 'user'];
        return admin.save();
}

beforeTests()
    .then(() => jestcli.run())
    .then(() => afterTests())
    .catch(error => {
        console.error;
        process.exit(1);
    });