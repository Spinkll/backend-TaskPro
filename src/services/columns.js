import { BoardsCollection } from '../db/boards.js';
import { ColumnsCollection } from '../db/columns.js';

export const getColumnsService = async (id) => {
  return await BoardsCollection.findOne(id).populate('columns');
};

export const getColumnByIdService = async (id) => {
  return await ColumnsCollection.findOne(id);
};

export const createColumnService = async (payload) => {
  const newColumn = await ColumnsCollection.create(payload);
  return newColumn;
};

export const updateColumnService = async (id, payload, options = {}) => {
  const rawResult = await ColumnsCollection.findOneAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  return {
    column: rawResult.value,
    isNew: !rawResult.lastErrorObject.updatedExisting,
  };
};

export const deleteColumnService = async (id) => {
  return await ColumnsCollection.findByIdAndDelete(id);
};

export const updateCardInColumnsService = async (id, payload, options = {}) => {
  return await ColumnsCollection.findByIdAndUpdate(id, {
    $push: { columns: payload },
  });
};

export const deleteCardInColumnsService = async (id, payload, options = {}) => {
  return await ColumnsCollection.findByIdAndUpdate(id, {
    $pull: { columns: payload._id },
  });
};
