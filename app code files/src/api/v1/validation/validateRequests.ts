import { Request, Response, NextFunction } from "express";
import Joi from "joi";

interface ValidationSchemas {
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
}

export const runRequestValidation =
  (rules: ValidationSchemas) =>
  (req: Request, res: Response, next: NextFunction) => {
    const toCheck: (keyof ValidationSchemas)[] = ["params", "query", "body"];

    for (const key of toCheck) {
      const rule = rules[key];
      if (!rule) continue;

      const result = rule.validate((req as any)[key], {
        abortEarly: false,
        stripUnknown: true,
      });

      if (result.error) {
        const messages = result.error.details.map((item) => item.message);

        return res.status(400).json({
          ok: false,
          message: "Invalid request data",
          issues: messages,
        });
      }

      (req as any)[key] = result.value;
    }

    next();
  };
