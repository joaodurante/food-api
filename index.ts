import { Server } from './server/server';
import { routes } from './routes';

const server = new Server();

server.bootstrap()
    .then(server => {
        console.log(`Server is listening on port: ${server.app.get('port')}`);
        routes();
    }).catch(error => {
        console.log('Server failed to start');
        console.error(error);
        process.exit(1);
    });


export { server };