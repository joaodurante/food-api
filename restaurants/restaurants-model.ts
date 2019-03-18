import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { environment } from '../common/environment';

interface Restaurant extends mongoose.Document{
    name: string,
    menu: MenuItem[]
}

interface MenuItem extends mongoose.Document{
    name: string,
    price: number
}

const menuSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 50,
        minlength: 3
    },
    price:{
        type: Number,
        required: true,
        max: 1000,
        min: 0.1
    }
});

const restSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        maxlength: 50,
        minlength: 3
    },
    menu: {
        type: [menuSchema],
        required: false,
        select: false,
        default: []
    }
});

const Restaurant = mongoose.model<Restaurant>('Restaurant', restSchema);

export { Restaurant };