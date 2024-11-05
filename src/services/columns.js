import { Card } from '../db/Card.js';
import { Column } from '../db/Column.js';

export const getColumnsService = async (id) => {
  return await Column.find(id);
};

export const getColumnByIdService = async (id) => {
  return await Column.findOne(id);
};

export const createColumnService = async (payload) => {
  return await Column.create(payload);
};

export const updateColumnService = async (id, payload, options = {}) => {
  const column = await Column.findOneAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  return column.value;
};

export const deleteColumnService = async (id) => {
  await Card.deleteMany({ columnId: id._id });
  return await Column.findOneAndDelete(id);
};
