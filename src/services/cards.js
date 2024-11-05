import { Card } from '../db/Card.js';

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
  const card = await Card.findOneAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  return card.value;
};

export const deleteCardService = async (id) => {
  return await Card.findOneAndDelete(id);
};
