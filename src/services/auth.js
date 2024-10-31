import createHttpError from "http-errors";
import bcrypt from "bcrypt";
/*import jwt from 'jsonwebtoken';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';*/
import { User } from "../db/User.js";
import { Session } from "../db/Session.js";
import { createSession } from "../constans/createSession.js";

const findUserByEmail = async (email) => {
   return await User.findOne({email});
};

export const registerUser = async (payload) => {
    let user = await findUserByEmail(payload.email);

    if(user) {
        throw createHttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    user = await User.create({...payload, password: hashedPassword});

    return user;
};


export const loginUser = async (payload) => {
    const user = await findUserByEmail(payload.email);

    if(!user) {
        throw createHttpError(401, 'The user does not exist');
    }

    const arrPasswordsEaqual = await bcrypt.compare(payload.password, user.password);

    if(!arrPasswordsEaqual){
        throw createHttpError(401, 'Invalid password');
    }

    await Session.deleteOne({userId: user._id});

    const session = await Session.create({
        userId: user.id,
        ...createSession()
    });

    return session;
};

export const logoutUser = async (sessionId, sessionToken) => {
    await Session.deleteOne({_id: sessionId, refreshToken: sessionToken});
};

export const refreshSession = async (sessionId, sessionToken) => {
   const session = await Session.findOne({_id: sessionId, refreshToken: sessionToken});
   if(!session) {
    throw createHttpError(401, 'Session not registry');
   }

   const now = new Date();

   if(session.refreshTokenValidUntil < now) {
    throw createHttpError(401, 'Refresh token expired' );
   }

   await Session.deleteOne({ _id: sessionId, refreshToken: sessionToken });

   const newSession = await Session.create({
    userId: session.userId,
    ...createSession()
});
 return newSession;
};

export const getUser = async (sessionId, sessionToken) => {
    const session = await Session.findOne({_id: sessionId, refreshToken: sessionToken});
    if(!session) {
    throw createHttpError(401, 'Session not registry');
   }

   const now = new Date();

   if(session.refreshTokenValidUntil < now) {
    throw createHttpError(401, 'Refresh token expired' );
   }

   const getingUser = await User.findById(session.userId);

   const user = {
        id: getingUser._id,
        name: getingUser.name,
        photo: getingUser.photo,
        email: getingUser.email
   };

   return user;
};

export const patchUsertById = async (UserID, pachedData) => {
    const pachedUser = await User.findByIdAndUpdate(UserID, {...pachedData}, {
        new: true,
    });

    if(!pachedUser) {
        throw createHttpError(404, {
            status: 404,
            message: "User not found",
            data: `user id is ${UserID}`
        });
    }

    return pachedUser;
};
