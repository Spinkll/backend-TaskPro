import Joi from 'joi';
import { PRIORITY_VARS } from '../constants';

export const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(20).required(),
  description: Joi.string(),
  priority: Joi.string()
    .valid(
      PRIORITY_VARS.LOW,
      PRIORITY_VARS.MEDIUM,
      PRIORITY_VARS.HIGH,
      PRIORITY_VARS.WITHOUT,
    )
    .default(PRIORITY_VARS.WITHOUT),
  date: Joi.string(),
  userId: Joi.date().required(),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().min(2).max(20),
  description: Joi.string(),
  priority: Joi.string()
    .valid(
      PRIORITY_VARS.LOW,
      PRIORITY_VARS.MEDIUM,
      PRIORITY_VARS.HIGH,
      PRIORITY_VARS.WITHOUT,
    )
    .default(PRIORITY_VARS.WITHOUT),
  date: Joi.date(),
});
