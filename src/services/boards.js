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

export const updateColumnInBoardService = async (id, payload, options = {}) => {
  const column = await BoardsCollection.findByIdAndUpdate(id, {
    $push: { columns: payload },
  });
  return column;
};

export const deleteColumnInBoardService = async (id, payload, options = {}) => {
  const { _id } = payload;
  const board = await BoardsCollection.findByIdAndUpdate(id, {
    $pull: { columns: _id },
  });
  return board;
};

export const updateCardInBoardService = async (id, payload, options = {}) => {
  const { boardId, columnId, cardId, userId } = id;
  const updateData = payload;
  const board = await BoardsCollection.findByIdAndUpdate(
    {
      userId: userId,
      _id: boardId,
      'columns._id': columnId,
      'columns.cards._id': cardId,
    },
    {
      $set: {
        'columns.$[column].cards.$[card]': { ...updateData },
      },
    },
    {
      arrayFilters: [{ 'column._id': columnId }, { 'card._id': cardId }],
      new: true,
    },
  );
  return board;
};

export const deleteCardInBoardService = async (id, payload, options = {}) => {
  const { boardId, columnId, cardId, userId } = id;
  const updateData = payload;
  const board = await BoardsCollection.findByIdAndUpdate(
    {
      userId: userId,
      _id: boardId,
      'columns._id': columnId,
      'columns.cards._id': cardId,
    },
    {
      $pull: {
        'columns.$[column].cards.$[card]': { ...updateData },
      },
    },
    {
      arrayFilters: [{ 'column._id': columnId }, { 'card._id': cardId }],
      new: true,
    },
  );
  return board;
};
