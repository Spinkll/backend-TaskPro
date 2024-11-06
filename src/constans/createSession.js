import { ACESS_TOKEN_ALIVE_TIME, REFRESH_TOKEN_ALIVE_TIME } from "./tokensLiveTime.js";
import crypto from "node:crypto";

export const createSession = () => ({
    accessToken: crypto.randomBytes(16).toString('base64'),
    refreshToken: crypto.randomBytes(16).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACESS_TOKEN_ALIVE_TIME),
    refreshTokenValidUntil:new Date(Date.now() + REFRESH_TOKEN_ALIVE_TIME)
});