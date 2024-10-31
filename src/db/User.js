import {model, Schema } from "mongoose";

const usersSchema = new Schema(
    {
        photo: {
            type: String,
        },
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            unique: true,
            require: true,
        },
        password: {
            type: String,
            require: true
        },
    }, {
        timestamps: true
    }
);

export const User = model('users', usersSchema);