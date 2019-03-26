import 'jest';
import * as request from 'supertest';
import { response } from 'express';

const address = (<any>global)._address;
const auth = (<any>global)._auth;

test('authenticate', async () => {
    try{
        let responsePost = await request(address)
            .post('/users')
            .set('Authorization', auth)
            .send({
                name: 'UserAuthenticate',
                email: 'users_authenticate@gmail.com',
                password: '123'
            });
        
            let responseAuth = await request(address)
                .post('/users/authenticate')
                .send({
                    email: responsePost.body.email,
                    password: '123'
                });
            expect(responseAuth.status).toBe(200);
            expect(responseAuth.body.accessToken).toBeDefined();
    }catch(e){
        fail(e);
    }
});

test('authenticate - INVALID', async () => {
    try{
        let responsePost = await request(address)
            .post('/users')
            .set('Authorization', auth)
            .send({
                name: 'UserAuthenticateInvalid',
                email: 'users_authenticate_invalid@gmail.com',
                password: '123'
            });
        
            let responseAuth = await request(address)
                .post('/users/authenticate')
                .send({
                    email: responsePost.body.email,
                    password: '1234'
                });
    }catch(e){
        expect(e.status).toBe(403);
    }
})

test('get /users', async () => {
    try {
        let response = await request(address)
            .get('/users')
            .set('Authorization', auth);
        expect(response.status).toBe(200);
        expect(response.body.items).toBeInstanceOf(Array);
    } catch (e) {
        fail(e);
    }
});

test('get /users/xxx - NOT FOUND', async () => {
    try {
        return await request(address)
            .get('/users/xxx')
            .set('Authorization', auth);;
    } catch (e) {
        expect(e.status).toBe(404);
    }
});

test('post /users', async () => {
    try {
        let response = await request(address)
            .post('/users')
            .set('Authorization', auth)
            .send({
                name: 'UserPost',
                email: 'users_post@gmail.com',
                password: '123'
            });

        expect(response.status).toBe(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.name).toBe('UserPost');
        expect(response.body.email).toBe('users_post@gmail.com');
        expect(response.body.password).toBeUndefined();
    } catch (e) {
        fail(e);
    }
});

test('post /user - INCOMPLETE', async () => {
    try {
        let response = await request(address)
            .post('/users')
            .set('Authorization', auth)
            .send({
                email: 'users_post_incomplete@gmail.com',
                password: '123'
            });
    } catch (e) {
        expect(e.status).toBe(400);
    }
});

test('post /user - DUPLICATE', async () => {
    try {
        let response1 = await request(address)
            .post('/users')
            .set('Authorization', auth)
            .send({
                name: 'UserDuplicate',
                email: 'users_post_duplicate@gmail.com',
                password: '123'
            });
        expect(response1.status).toBe(200);

        let response2 = await request(address)
            .post('/users')
            .set('Authorization', auth)
            .send({
                name: 'UserDuplicate',
                email: 'users_post_duplicate@gmail.com',
                password: '123'
            });

    } catch (e) {
        expect(e.status).toBe(400);
    }
});

test('post /user/authenticate', async () => {
    try {
        const password = '123';
        let userResponse = await request(address)
            .post('/users')
            .set('Authorization', auth)
            .send({
                name: 'UserToken',
                email: 'usertoken@gmail.com',
                password: password
            });

        let tokenResponse = await request(address)
            .post('/users/authenticate')
            .set('Authorization', auth)
            .send({
                email: userResponse.body.email,
                password: password
            });
        expect(tokenResponse.status).toBe(200);
        expect(tokenResponse.body.accessToken).toBeDefined();
    } catch (e) {
        fail(e);
    }
});

test('post /user/authenticate - WRONG', async () => {
    try {
        let userResponse = await request(address)
            .post('/users')
            .set('Authorization', auth)
            .send({
                name: 'UserTokenWrong',
                email: 'usertokenwrong@gmail.com',
                password: '123'
            });

        let tokenResponse = await request(address)
            .post('/users/authenticate')
            .set('Authorization', auth)
            .send({
                email: userResponse.body.email,
                password: '321'
            });
    } catch (e) {
        expect(e.status).toBe(403);
    }
});

test('patch /users/:id', async () => {
    try {
        let postResponse = await request(address)
            .post('/users')
            .set('Authorization', auth)
            .send({
                name: 'UserPatch',
                email: 'users_patch@gmail.com',
                password: '123'
            });

        let patchResponse = await request(address)
            .patch(`/users/${postResponse.body._id}`)
            .set('Authorization', auth)
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
        return await request(address).patch('/users/xxx').set('Authorization', auth);
    } catch (e) {
        expect(e.status).toBe(404);
    }
});

test('delete /users/:id', async () => {
    try {
        let postResponse = await request(address)
            .post('/users')
            .set('Authorization', auth)
            .send({
                name: 'UserDelete',
                email: 'users_delete@gmail.com',
                password: '123'
            });

        let deleteResponse = await request(address)
            .delete(`/users/${postResponse.body._id}`)
            .set('Authorization', auth);

        expect(deleteResponse.status).toBe(200);
    } catch (e) {
        fail(e);
    }
});

test('delete /users/xxx - NOT FOUND', async () => {
    try {
        return await request(address)
            .delete('/users/xxx')
            .set('Authorization', auth);
    } catch (e) {
        expect(e.status).toBe(404);
    }
});
