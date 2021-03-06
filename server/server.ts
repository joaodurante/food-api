import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import { environment } from '../common/environment';
import { registerRoutes } from './init-routes';
import { tokenParser } from '../security/token-parser';
import { defaultLogger, errorLogger } from '../common/logger';

export class Server {
    app: express.Express;
    connection;

    initDb(): Promise<any>{
        return mongoose.connect(environment.db.url, environment.db.options);
    }
    initRoutes(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.app = express();
                this.app.use(bodyParser.urlencoded({ extended: true }));
                this.app.use(bodyParser.json());
                this.app.use(tokenParser);

                // registra logs padrões para as requisições
                this.app.use(defaultLogger);
                this.app.use(errorLogger);
                
                // registra as rotas e os errorHandlers
                registerRoutes(this.app); 

                this.connection = this.app.listen(environment.server.port, () => {
                    resolve();
                });

                
            } catch (err) {
                reject(err);
            }
        })
    }
    async bootstrap(): Promise<Server> {
        return this.initDb().then(() =>
            this.initRoutes().then(() => this))
    }

    async shutdown(){
        let dc = await mongoose.disconnect();
        this.connection.close();
    }
}