import createHttpError from "http-errors";
import { boardsModel } from '../db/Boards.js';
import { Column } from "../db/Column.js";
import { Card } from "../db/Cards.js";

export const createBoard = async (payload) => {
  return await boardsModel.create(payload);
};

export const getBoards = async (payload) => {
  const boards = await boardsModel.find({userId: payload});
  if(boards.length === 0) {
    throw createHttpError(404, 'Boards not found');
  }
  return boards;
};

export const parhBoard = async (boardId, data) => {
  const boards = await boardsModel.findByIdAndUpdate(boardId, data, {
    new: true,
});
  if(!boards) {
    throw createHttpError(404, 'Board not found');
  }
  return boards;
};

export const deleteBoard = async (boardId) => {
  const boards = await boardsModel.findOneAndDelete({_id: boardId});
  await Column.deleteMany({boardId: boardId});
  await Card.deleteMany({boardId: boardId});
  if(!boards) {
    throw createHttpError(404, 'Board not found');
  }
};

export const getColumns = async (payload) => {
  const columns = await Column.find({boardId: payload});
  if(columns.length === 0) {
    throw createHttpError(404, 'Columns not found');
  }
  return columns;
};


export const createColumn = async (payload) => {
  return await Column.create(payload);
};

export const pathColumn = async (columnId, data) => {
  const column = await Column.findByIdAndUpdate(columnId, data, {
    new: true,
});
  if(!column) {
    throw createHttpError(404, 'Column not found');
  }
  return column;
};

export const deleteColumn = async (columnId) => {
  const column = await Column.findOneAndDelete({_id: columnId});
  await Card.deleteMany({columnId: columnId});

  if(!column) {
    throw createHttpError(404, 'Column not found');
  }
};

export const getCards = async (payload) => {
  const cards = await Card.find({columnId: payload});
  if(cards.length === 0) {
    throw createHttpError(404, 'Cards not found');
  }
  return cards;
};

export const createCard = async (payload) => {
  return await Card.create(payload);
};

export const pathCard = async (cardId, data) => {
  const card = await Card.findByIdAndUpdate(cardId, data, {
    new: true,
});
  if(!card) {
    throw createHttpError(404, 'Card not found');
  }
  return card;
};

export const deletecard = async (cardId) => {
  const card = await Card.findOneAndDelete({_id: cardId});
  if(!card) {
    throw createHttpError(404, 'Card not found');
  }
};