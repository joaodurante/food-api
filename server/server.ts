import * as express from 'express';
import * as bodyParser from 'body-parser';
import { environment } from '../common/environment';

export class Server {
    app: express.Express;
    router: express.Router;

    initRoutes(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.app = express();
                this.router = express.Router();
                this.app.set('port', environment.server.port);
                this.app.use(bodyParser.json());
                this.app.use(bodyParser.urlencoded({ extended: true }));
                
                this.app.listen(this.app.get('port'), () => {
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        })
    }

    bootstrap(): Promise<Server> {
        return this.initRoutes().then(() => this);
    }
}