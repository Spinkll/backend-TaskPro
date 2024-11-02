import { BoardsCollection } from '../db/boards.js';

export const getBoardsService = async (id) => {
  return await BoardsCollection.find(id);
};

export const getBoardByIdService = async (id) => {
  return await BoardsCollection.findOne(id);
};

export const createBoardService = async (payload) => {
  return await BoardsCollection.create(payload);
};

export const updateBoardService = async (id, payload, options = {}) => {
  const rawResult = await BoardsCollection.findOneAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  return {
    board: rawResult.value,
    isNew: !rawResult.lastErrorObject.updatedExisting,
  };
};

export const deleteBoardService = async (id) => {
  return await BoardsCollection.findOneAndDelete(id);
};

export const updateBoardByColumnIdService = async (
  id,
  payload,
  options = {},
) => {
  const column = await BoardsCollection.findByIdAndUpdate(id, {
    $push: { columns: payload },
  });
  return column;
};

export const deleteBoardByColumnIdService = async (
  id,
  payload,
  options = {},
) => {
  const { _id } = payload;
  const board = await BoardsCollection.findByIdAndUpdate(id, {
    $push: { columns: _id },
  });
  return board;
};
