import 'jest';
import * as request from 'supertest';

let address = (<any>global)._address;

test('get /users', async () => {
    try{
        let response = await request(address).get('/users');
        expect(response.status).toBe(200);
        expect(response.body.items).toBeInstanceOf(Array);
    }catch(e){
        fail(e);
    }
});

test('get /users/xxx - NOT FOUND', async () => {
    try{
        return await request(address).get('/users/xxx');
    }catch(e){
        expect(e.status).toBe(404);
    }
});

test('post /users', async () => {
    try {
        let response = await request(address).post('/users').send({
            name: 'UserPost',
            email: 'users_post@gmail.com',
            password: '123'
        }).expect(200);

        expect(response.body._id).toBeDefined();
        expect(response.body.name).toBe('UserPost');
        expect(response.body.email).toBe('users_post@gmail.com');
        expect(response.body.password).toBeUndefined();
    } catch (e) {
        fail(e);
    }
});

test('post /user - INCOMPLETE', async () => {
    try{
        let response = await request(address).post('/users').send({
            email: 'users_post_incomplete@gmail.com',
            password: '123'
        });
    }catch(e){
        expect(e.status).toBe(400);
    }
});

test('post /user - DUPLICATE', async () => {
    try{
        let response1 = await request(address).post('/users').send({
            name: 'UserDuplicate',
            email: 'users_post_duplicate@gmail.com',
            password: '123'
        });
        expect(response1.status).toBe(200);

        let response2 = await request(address).post('/users').send({
            name: 'UserDuplicate',
            email: 'users_post_duplicate@gmail.com',
            password: '123'
        });
        
    }catch(e){
        expect(e.status).toBe(400);
    }
});

test('patch /users/:id', async () => {
    try {
        let postResponse = await request(address).post('/users').send({
            name: 'UserPatch',
            email: 'users_patch@gmail.com',
            password: '123'
        });

        let patchResponse = await request(address)
            .patch(`/users/${postResponse.body._id}`)
            .send({
                name: 'UserPatch - After'
        });

        expect(patchResponse.status).toBe(200);
        expect(patchResponse.body._id).toBeDefined();
        expect(patchResponse.body.name).toBe('UserPatch - After');
        expect(patchResponse.body.email).toBe('users_patch@gmail.com');
        expect(patchResponse.body.password).toBeUndefined();
    } catch (e) {
        fail(e);
    }
});

test('patch /users/xxx - NOT FOUND', async () => {
    try {
        return await request(address).patch('/users/xxx');
    }catch(e){
        expect(e.status).toBe(404);
    }
});

test('delete /users/:id', async () => {
    try{
        let postResponse = await request(address).post('/users').send({
            name: 'UserDelete',
            email: 'users_delete@gmail.com',
            password: '123'
        });

        let deleteResponse = await request(address)
            .delete(`/users/${postResponse.body._id}`);
        
        expect(deleteResponse.status).toBe(200);
    }catch(e){
        fail(e);
    }
});

test('delete /users/xxx - NOT FOUND', async () => {
    try{
        return await request(address).delete('/users/xxx');
    }catch(e){
        expect(e.status).toBe(404);
    }
})
