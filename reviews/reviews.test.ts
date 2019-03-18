import 'jest';
import * as request from 'supertest';
let address = (<any>global)._address;

test('get /reviews', async () => {
    try {
        let response = await request(address).get('/reviews');
        expect(response.status).toBe(200);
        expect(response.body.items).toBeInstanceOf(Array);
    } catch (err) {
        fail(err);
    }
});

