import Joi from "joi";
import { RequestHandler } from "express";

export const runValidation =
  (schema: Joi.ObjectSchema, target: "body" | "query" | "params" = "body"): RequestHandler =>
  async (req, res, next) => {
    try {
      const cleanedData = await schema.validateAsync(req[target], {
        abortEarly: false,
        stripUnknown: true,
      });
      req[target] = cleanedData as any;

      next();
    } catch (validationErr: any) {
      const issues = validationErr?.details?.map((item: any) => item.message) || [];

      res.status(400).json({
        ok: false,
        message: "Request data did not pass validation",
        issues,
      });
    }
  };
