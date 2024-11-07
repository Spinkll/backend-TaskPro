import mongoose from 'mongoose';
import pkg from 'mongoose';
const { ObjectID } = pkg;

export const convertToMongoObjId = (strId) => {
  return new mongoose.Types.ObjectId(strId.toString());
};
