import { Card } from '../db/Card.js';
import { Column } from '../db/Column.js';

export const getCardsService = async (id) => {
  return await Card.find(id);
};

export const getCardByIdService = async (id) => {
  return await Card.findOne(id);
};

export const createCardService = async (payload) => {
  return await Card.create(payload);
};

export const updateCardService = async (id, payload, options = {}) => {
  const rawResult = await Card.findOneAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  return {
    column: rawResult.value,
    isNew: !rawResult.lastErrorObject.updatedExisting,
  };
};

export const deleteCardService = async (id) => {
  return await Card.findByIdAndDelete(id);
};
