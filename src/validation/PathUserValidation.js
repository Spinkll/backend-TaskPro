import Joi from "joi";

export const PathUserValidationShema = Joi.object({
    name: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    password:
    Joi.string()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$')),
    theme: Joi.string().required().min(3).max(20).valid('dark', 'light', 'violet').default('light'),
});