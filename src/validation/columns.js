import Joi from 'joi';

export const createColumnSchema = Joi.object({
  title: Joi.string().required().min(2).max(20).required(),
});

export const updateColumnSchema = Joi.object({
  title: Joi.string().min(2).max(20),
});
