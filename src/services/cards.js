import { CardsCollection } from '../db/cards.js';
import { ColumnsCollection } from '../db/columns.js';

export const getCardsService = async (id) => {
  return await ColumnsCollection.findOne(id).populate('cards');
};

export const getCardByIdService = async (id) => {
  return await CardsCollection.findOne(id);
};

export const createCardService = async (payload) => {
  return await CardsCollection.create(payload);
};

export const updateCardService = async (id, payload, options = {}) => {
  const rawResult = await CardsCollection.findOneAndUpdate(id, payload, {
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
  return await CardsCollection.findByIdAndDelete(id);
};
