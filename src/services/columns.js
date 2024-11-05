import { Column } from '../db/Column.js';
import { convertToMongoObjId } from '../utils/convertToMongoObjId.js';

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
  return await Column.findOneAndDelete(id);
};

export const updateCardInColumnService = async (id, payload, options = {}) => {
  const { columnId, boardId, _id } = id;
  const column = await Column.findOneAndUpdate(
    {
      _id: columnId,
      'cards._id': _id,
    },
    {
      $set: {
        'cards.$.title': payload.title,
        'cards.$.description': payload.description,
        'cards.$.priority': payload.priority,
        'cards.$.date': payload.date,
        'cards.$.columnId': payload.columnId,
      }, // Оновлює всю колонку даними в `payload`
    },
    {
      new: true,
    },
  );
  return column;
};

export const deleteCardInColumnService = async (id, payload, options = {}) => {
  const column = await Column.findOneAndUpdate(
    id,
    {
      $pull: { cards: payload._id },
    },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  return column.value;
};

export const addsCardInColumnService = async (id, payload, options = {}) => {
  const column = await Column.findOneAndUpdate(
    id,
    {
      $push: { cards: payload },
    },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  return column.value;
};
