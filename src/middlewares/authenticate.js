import createHttpError from 'http-errors';
import { Session } from '../db/Session.js';
import { User } from '../db/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('authorization');
  if (!authHeader) {
    return next(createHttpError(401, 'Auth header is required!'));
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header must be of Bearer!'));
  }

  const session = await Session.findOne({ accessToken: token });

  if (!session) {
    return next(createHttpError(401, 'There are no sessions with this token'));
  }

  if (session.accessTokenValidUntil < new Date()) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'There are no sessions with this user'));
  }

  req.user = user;

  next();
};
