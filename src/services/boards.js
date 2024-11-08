import { Board } from '../db/Board.js';
import { Card } from '../db/Card.js';
import { Column } from '../db/Column.js';

export const getBoardsService = async (id) => {
  return await Board.find(id);
};

export const getBoardByIdService = async (id) => {
  return await Board.findById(id);
};

export const createBoardService = async (payload) => {
  return await Board.create(payload);
};

export const updateBoardService = async (id, payload, options = {}) => {
  const board = await Board.findOneAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  return board.value;
};

export const deleteBoardService = async (id) => {
  await Card.deleteMany({ boardId: id._id });
  await Column.deleteMany({ boardId: id._id });
  return await Board.findOneAndDelete(id);
};
