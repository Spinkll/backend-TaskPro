import Joi from 'joi';

export const createColumnsSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(2).max(20),
});