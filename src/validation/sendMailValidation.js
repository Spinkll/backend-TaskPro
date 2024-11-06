import Joi from 'joi';

export const sendMailSchema = Joi.object({
  email: Joi.string().email().required(),
  comment: Joi.string().required(),
});
