import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidIds =
  (...paramNames) =>
  (req, res, next) => {
    for (const paramName of paramNames) {
      const id = req.params[paramName];
      if (!isValidObjectId(id)) {
        next(createHttpError(400, `${paramName} is not a valid ID`));
        return;
      }
    }
    next();
  };
