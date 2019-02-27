import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { environment } from '../common/environment';

interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female']
    }
});

userSchema.pre('save', function (next) {
    const user = (this as User);
    if (!user.isModified('password'))
        next();
    else {
        bcrypt.hash(user.password, environment.security.saltRounds)
            .then(hash => {
                user.password = hash;
                next();
            }).catch(next);
    }
})

const User = mongoose.model<User>('User', userSchema);

export { User }