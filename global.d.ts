import { User } from './users/users-model';
import {Request} from 'express';

/*
 * Insere a propriedade 'authenticated' no request
*/
declare global {
    namespace Express {
      interface Request {
        authenticated: User
      }
    }
  }