import Joi from 'joi';

export const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(20).required(),
  description: Joi.string(),
  priority: Joi.string()
    .valid('Low', 'Medium', 'High', 'Without')
    .default('Without'),
  date: Joi.string(),
  userId: Joi.string().required(),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().min(2).max(20),
  description: Joi.string(),
  priority: Joi.string()
    .valid('Low', 'Medium', 'High', 'Without')
    .default('Without'),
  date: Joi.string(),
});
