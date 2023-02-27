import * as Joi from 'joi';
export const JoiValidationSchema = Joi.object({
    // PORT: Joi.required(),
    PORT: Joi.number().default(3001)
})