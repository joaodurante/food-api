import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { environment } from '../common/environment';

interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string
}

interface UserModel extends mongoose.Model<User>{
    findByEmail(email: string): Promise<User>
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
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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

userSchema.statics.findByEmail = function(email: string){
    return this.findOne({email});
}

const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environment.security.saltRounds)
        .then(hash => {
            obj.password = hash;
            next();
        }).catch(next);
}

const saveMiddleware = function (next) {
    const user = (this as User);
    if (!user.isModified('password'))
        next();
    else
        hashPassword(user, next);
}

const updateMiddleware = function (next) {
    if (!this.getUpdate().password)
        next();
    else
        hashPassword(this.getUpdate(), next);
}

userSchema.pre('save', saveMiddleware);
userSchema.pre('findOneAndUpdate', updateMiddleware)

const User = mongoose.model<User, UserModel>('User', userSchema);

export { User, UserModel }