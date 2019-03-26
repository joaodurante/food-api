import 'jest';
import * as request from 'supertest';

let address = (<any>global)._address;
let auth = (<any>global)._auth;

test('get /restaurants', async () => {
    try {
        let response = await request(address).get('/restaurants');
        expect(response.status).toBe(200);
        expect(response.body.items).toBeInstanceOf(Array);
    } catch (e) {
        fail(e);
    }
});

test('get /restaurants/xxx - NOT FOUND', async () => {
    try {
        return await request(address).get('/restaurants/xxx');
    } catch (e) {
        expect(e.status).toBe(404);
    }
});

test('post /restaurants', async () => {
    try {
        let response = await request(address)
            .post('/restaurants')
            .set('Authorization', auth)
            .send({
                name: 'RestaurantTest'
            });
        expect(response.status).toBe(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.name).toBe('RestaurantTest');
    } catch (e) {
        fail(e);
    }
});

test('post /restaurants - INCOMPLETE', async () => {
    try {
        await request(address)
            .post('/restaurants')
            .set('Authorization', auth)
            .send({});
    } catch (e) {
        expect(e.status).toBe(400);
    }
})

test('post /restaurants - DUPLICATE', async () => {
    try {
        await request(address)
            .post('/restaurants')
            .set('Authorization', auth)
            .send({
                name: 'RestaurantDuplicate'
            });
        await request(address)
            .post('/restaurants')
            .set('Authorization', auth)
            .send({
                name: 'RestaurantDuplicate'
            });
    } catch (e) {
        expect(e.status).toBe(400);
    }
});

test('patch /restaurants/:id', async () => {
    try {
        let postResponse = await request(address)
            .post('/restaurants')
            .set('Authorization', auth)
            .send({
                name: 'RestaurantPatch'
            });

        let patchResponse = await request(address)
            .patch(`/restaurants/${postResponse.body._id}`)
            .set('Authorization', auth)
            .send({
                name: 'RestaurantPatch - After'
            });

        expect(patchResponse.status).toBe(200);
        expect(patchResponse.body._id).toBe(postResponse.body._id);
        expect(patchResponse.body.name).toBe('RestaurantPatch - After')
    } catch (e) {
        fail(e);
    }
});

test('patch /restaurants/xxx - NOT FOUND', async () => {
    try {
        return await request(address)
            .patch('/restaurants/xxx')
            .set('Authorization', auth);
    } catch (e) {
        expect(e.status).toBe(404);
    }
});

test('delete /restaurants', async () => {
    try {
        let postResponse = await request(address)
            .post('/restaurants')
            .set('Authorization', auth)
            .send({
                name: 'RestaurantDelete'
            });
        let deleteResponse = await request(address)
            .delete(`/restaurants/${postResponse.body._id}`)
            .set('Authorization', auth);

        expect(deleteResponse.status).toBe(200);
    } catch (e) {
        fail(e);
    }
});

test('delete /restaurants/xxx - NOT FOUND', async () => {
    try {
        let reponse = await request(address)
            .delete('/restaurants/xxx')
            .set('Authorization', auth);
    } catch (e) {
        expect(e.status).toBe(404);
    }
})