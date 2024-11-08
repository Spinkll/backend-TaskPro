import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId =
  (idName = 'id') =>
  (req, res, next) => {
    const id = req.params[idName];

    if (!isValidObjectId(id)) {
      throw createHttpError(
        400,
        `Invalid ${idName}: ${id}. Expected a valid MongoDB ObjectId.`,
      );
    }
    next();
  };
