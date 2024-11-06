import Joi from 'joi';

export const createBoardSchema = Joi.object({
  title: Joi.string().required().min(2).max(20),
  icon: Joi.string(),
  background: Joi.string(),
});
