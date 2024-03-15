import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

/**
 * validation middleware: it validates the incoming request object based on the provided zod schema
 * @param schema z.AnyZodObject
 * @returns
 */
const validate =
  (schema: z.AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // validates the request based on the provided zod schema
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      next(error);
    }
  };

export default validate;
