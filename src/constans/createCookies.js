import { REFRESH_TOKEN_ALIVE_TIME } from "./tokensLiveTime.js";

export const createCookies = (session, res) => {

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + REFRESH_TOKEN_ALIVE_TIME)
    });

    res.cookie('sessionToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + REFRESH_TOKEN_ALIVE_TIME)
    });
};
