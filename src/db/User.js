import {model, Schema } from "mongoose";

const usersSchema = new Schema(
    {
        photo: {
            type: String,
            default: 'https://res.cloudinary.com/dnfxykh8j/image/upload/v1730411910/wf6g1bi1qvd7spmurqi3.png'
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
            default: 'light'
        }
    }, {
        timestamps: true
    }
);

export const User = model('users', usersSchema);
