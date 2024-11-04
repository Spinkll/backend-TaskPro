import { Board } from '../db/Board.js';
import { convertToMongoObjId } from '../utils/convertToMongoObjId.js';

export const getBoardsService = async (id) => {
  return await Board.find(id);
};

export const getBoardByIdService = async (id) => {
  return await Board.findOne(id);
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
  return await Board.findOneAndDelete(id);
};

export const addColumnInBoardService = async (id, payload, options = {}) => {
  const board = await Board.findOneAndUpdate(
    id,
    { $push: { columns: payload } },
    { new: true, includeResultMetadata: true, ...options },
  );

  return board.value;
};

export const deleteColumnInBoardService = async (id, payload, options = {}) => {
  const board = await Board.findOneAndUpdate(
    id,
    { $pull: { columns: { _id: payload._id } } },
    { new: true, includeResultMetadata: true, ...options },
  );

  return board.value;
};

export const updateColumnInBoardService = async (id, payload, options = {}) => {
  const { _id: columnId, boardId } = payload;
  const boardIdObj = convertToMongoObjId(boardId);
  const board = await Board.findOneAndUpdate(
    {
      _id: boardIdObj,
      'columns._id': columnId,
    },
    {
      $set: { 'columns.$.title': payload.title }, // Оновлює всю колонку даними в `payload`
    },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  return board.value;
};

export const addsCardInBoardService = async (id, payload, options = {}) => {
  const { columnId, boardId } = payload;
  const boardIdObj = convertToMongoObjId(boardId);
  const board = await Board.findOneAndUpdate(
    { _id: boardIdObj, 'columns._id': columnId },
    { $push: { 'columns.$.cards': payload } }, // додаємо картку до конкретної колонки
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  return board.value;
};

export const deleteCardInBoardService = async (id, payload, options = {}) => {
  const { columnId, boardId } = payload;
  const boardIdObj = convertToMongoObjId(boardId);
  const board = await Board.findOneAndUpdate(
    { _id: boardIdObj, 'columns._id': columnId },
    { $pull: { 'columns.$.cards': { _id: payload._id } } }, // видаляемо картку з конкретної колонки
    { new: true, includeResultMetadata: true, ...options },
  );

  return board.value;
};

export const updateCardInBoardService = async (id, payload, options = {}) => {
  const { columnId, boardId, _id: cardId } = id;
  const cardIdObj = convertToMongoObjId(cardId);
  const columnIdObj = convertToMongoObjId(columnId);
  const boardIdObj = convertToMongoObjId(boardId);

  console.log('payload', payload);
  const board = await Board.findOneAndUpdate(
    {
      _id: boardIdObj,
      'columns._id': columnIdObj,
      'columns.cards._id': cardIdObj,
    },
    {
      $set: {
        'columns.$[column].cards.$[card].title': payload.title,
        'columns.$[column].cards.$[card].description': payload.description,
        'columns.$[column].cards.$[card].priority': payload.priority,
        'columns.$[column].cards.$[card].date': payload.date,
        'columns.$[column].cards.$[card].columnId': payload.columnId,
      },
    },
    {
      new: true,
      arrayFilters: [{ 'column._id': columnIdObj }, { 'card._id': cardIdObj }],
      includeResultMetadata: true,
      ...options,
    },
  );

  return board.value;
};
