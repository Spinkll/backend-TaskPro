import Joi from "joi";

export const loginUserValidation = Joi.object({
    email: Joi.string().required().email(),
    password:
    Joi.string()
    .required().min(8).max(20)
});