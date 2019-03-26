import 'jest';
import * as request from 'supertest';
let address = (<any>global)._address;
let auth = (<any>global)._auth;

test('get /reviews', async () => {
    try {
        let response = await request(address)
            .get('/reviews')
            .set('Authorization', auth);
        expect(response.status).toBe(200);
        expect(response.body.items).toBeInstanceOf(Array);
    } catch (err) {
        fail(err);
    }
});

test('get /reviews/xxx - NOT FOUND', async () => {
    try {
        return await request(address)
            .get('/reviews/xxx')
            .set('Authorization', auth);
    } catch (e) {
        expect(e.status).toBe(404);
    }
});

test('post /reviews', async () => {
    try {
        let date: Date = new Date();
        let user = await request(address)
            .post('/users')
            .set('Authorization', auth)
            .send({
                name: 'UserReview',
                email: 'userreview@gmail.com',
                password: '123'
            });

        let restaurant = await request(address)
            .post('/restaurants')
            .set('Authorization', auth)
            .send({
                name: 'RestaurantReview'
            });

        let response = await request(address)
            .post('/reviews')
            .set('Authorization', auth)
            .send({
                date: date,
                rating: 4,
                comments: 'Comments',
                restaurant: restaurant.body._id,
                user: user.body._id
            });

        expect(response.status).toBe(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.user).toBe(user.body._id);
        expect(response.body.restaurant).toBe(restaurant.body._id);
    } catch (e) {
        fail(e);
    }
});


