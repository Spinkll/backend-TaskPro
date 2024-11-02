import { BoardsCollection } from '../db/boards.js';
import { ColumnsCollection } from '../db/columns.js';
import { updateBoardByColumnIdService } from './boards.js';

export const getColumnsService = async (id) => {
  return await BoardsCollection.findById(id).populate('columns');
};

export const getColumnByIdService = async (id) => {
  return await ColumnsCollection.findOne(id);
};

export const createColumnService = async (payload) => {
  const newColumn = await ColumnsCollection.create(payload);
  const { boardId } = payload;
  await updateBoardByColumnIdService({ _id: boardId }, newColumn);
  return newColumn;
};

export const updateColumnService = async (id, payload, options = {}) => {
  const rawResult = await ColumnsCollection.findOneAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  const { boardId } = payload;
  await updateBoardByColumnIdService({ _id: boardId }, rawResult.value);
  return {
    column: rawResult.value,
    isNew: !rawResult.lastErrorObject.updatedExisting,
  };
};

export const deleteColumnService = async (id) => {
  return await ColumnsCollection.findOneAndDelete(id);
};
