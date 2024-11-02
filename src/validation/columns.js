import Joi from 'joi';
import { updateCardSchema } from './cards.js';

export const createColumnSchema = Joi.object({
  title: Joi.string().required().min(2).max(20).required(),
  cards: Joi.array().items(updateCardSchema),
});

export const updateColumnSchema = Joi.object({
  title: Joi.string().min(2).max(20),
  cards: Joi.array().items(updateCardSchema),
});
