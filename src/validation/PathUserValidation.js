import Joi from "joi";

export const PathUserValidationShema = Joi.object({
    name: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    password:
    Joi.string()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$')),
});