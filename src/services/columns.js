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
  const rawResult = await Column.findOneAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  return rawResult.value;
  // {
  //   column: rawResult.value,
  //   isNew: !rawResult.lastErrorObject.updatedExisting,
  // };
};

export const deleteColumnService = async (id) => {
  return await Column.findByIdAndDelete(id);
};

export const updateCardInColumnsService = async (id, payload, options = {}) => {
  const { columnId, boardId, _id: cardId } = payload;
  const cardIdObj = convertToMongoObjId(cardId);
  const columnIdObj = convertToMongoObjId(columnId);
  return await Column.findByIdAndUpdate(
    {
      _id: columnIdObj,
      'cards._id': cardIdObj,
    },
    {
      $set: {
        'cards.$.title': payload.title,
        'cards.$.description': payload.description,
        '.cards.$.priority': payload.priority,
        '.cards.$.date': payload.date,
        '.cards.$.columnId': payload.columnId,
      }, // Оновлює всю колонку даними в `payload`
    },
    {
      new: true,
    },
  );
};

export const deleteCardInColumnsService = async (id, payload, options = {}) => {
  return await Column.findByIdAndUpdate(id, {
    $pull: { cards: payload._id },
  });
};

export const addsCardInColumnsService = async (id, payload, options = {}) => {
  return await Column.findByIdAndUpdate(id, {
    $push: { cards: payload },
  });
};
