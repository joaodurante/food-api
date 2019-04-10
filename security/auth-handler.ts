import * as express from 'express';
import * as httpErrors from 'httperrors';
import * as jwt from 'jsonwebtoken';
import { User } from '../users/users-model';
import { environment } from '../common/environment';

const authenticate: express.RequestHandler = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        let user = await User.findByEmail(email, '+password');
        if (user && user.matches(password)) {
            const token = jwt.sign(
                { sub: user.email, iss: environment.common.name },
                environment.security.apiSecret
            );
            res.json({ name: user.name, email: user.email, accessToken: token });

        } else {
            return next(new httpErrors.Forbidden('Invalid credentials'));
        }

    } catch (e) {
        next(e);
    }
}

export { authenticate };