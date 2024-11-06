import Joi from 'joi';

export const createCardSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().min(3).max(20),
  description: Joi.string().min(3).max(120),
  priority: Joi.string().valid('Without', 'Low', 'Medium', 'Hight').default('Without'),
  deadline: Joi.string(),
});