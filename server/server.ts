import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { environment } from '../common/environment';
import { registerRoutes } from './routes';

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
                this.app.set('port', environment.server.port);
                this.app.use(bodyParser.urlencoded({ extended: true }));
                this.app.use(bodyParser.json());
                registerRoutes(this.app); // registra as rotas e os errorHandlers

                this.connection = this.app.listen(this.app.get('port'), () => {
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