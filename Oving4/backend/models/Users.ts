//File used for defining User schema matches collection in MongoDB

import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: String,
    password: String
}

const UsersSchema = new Schema({
    name: String,
    password: String
});

// mongoose.pluralize(null); is set in Movies.ts

const User = mongoose.model<IUser>(
    'Users',
    UsersSchema
)

export default User;