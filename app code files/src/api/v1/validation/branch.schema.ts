import Joi from "joi";

export const branchCreateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  address: Joi.string().trim().min(5).max(250).required(),
  phone: Joi.string()
    .trim()
    .pattern(/^[+]?[\d\s\-().]{7,20}$/)
    .required(),
  description: Joi.string().trim().max(500).optional(),
});

export const branchUpdateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).optional(),
  address: Joi.string().trim().min(5).max(250).optional(),
  phone: Joi.string()
    .trim()
    .pattern(/^[+]?[\d\s\-().]{7,20}$/)
    .optional(),
  description: Joi.string().trim().max(500).optional(),
});

