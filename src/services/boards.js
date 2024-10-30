import { boardsModel } from '../db/boards.js';

export const createBoard = async (payload) => {
  return await boardsModel.create(payload);
};
