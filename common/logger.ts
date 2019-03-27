import * as bunyan from 'bunyan';
import * as morgan from 'morgan';
import { environment } from './environment';
import * as bunyanExpress from 'bunyan-express-serializer';

const defaultLogger = morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    },
    stream: process.stdout
});

const errorLogger = morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    },
    stream: process.stderr
});

const logger = bunyan.createLogger({
    name: environment.log.name,
    level: (<any>bunyan).resolveLevel(environment.log.level),
    serializers: {
        req: bunyanExpress,
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err
    }
});

const log = (message: string, obj?: Object) => {
    const options = obj ? obj : {};
    const log = logger.child(options, true);
    log.debug(message);
}

export { defaultLogger, errorLogger, log };