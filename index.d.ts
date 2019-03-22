import { User } from './users/users-model';

/*
 * Insere a propriedade 'authenticated' no request
*/
declare module 'express' {
    export interface Request {
        authenticated: User
    }
}