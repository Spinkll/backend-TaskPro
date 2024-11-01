import {model, Schema } from "mongoose";

const usersSchema = new Schema(
    {
        photo: {
            type: String,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        theme: {
            type: String,
        }
    }, {
        timestamps: true
    }
);

export const User = model('users', usersSchema);