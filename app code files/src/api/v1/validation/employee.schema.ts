import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80).required(),
  position: Joi.string().trim().min(2).max(80).required(),
  department: Joi.string().trim().min(2).max(80).required(),
  email: Joi.string().trim().lowercase().email().required(),
  phone: Joi.string().trim().min(3).max(20).optional(),
  branchId: Joi.alternatives()
    .try(Joi.number(), Joi.string().regex(/^\d+$/)) 
    .required(),
});

export const updateEmployeeSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80),
  position: Joi.string().trim().min(2).max(80),
  department: Joi.string().trim().min(2).max(80),
  email: Joi.string().trim().lowercase().email(),
  phone: Joi.string().trim().min(3).max(20),
  branchId: Joi.alternatives().try(Joi.number(), Joi.string().regex(/^\d+$/)),
}).min(1);

