import * as mongoose from 'mongoose';

interface User extends mongoose.Document{
    name: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false
    }
});

const User = mongoose.model<User>('User', userSchema);

export{ User }