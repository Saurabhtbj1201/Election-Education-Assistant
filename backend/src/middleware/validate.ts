import type { RequestHandler } from "express";
import type { ZodTypeAny } from "zod";

function validate(schema: ZodTypeAny, target: "body" | "query"): RequestHandler {
  return (req, res, next) => {
    const payload = target === "body" ? req.body : req.query;
    const result = schema.safeParse(payload);

    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message
        }))
      });
    }

    return next();
  };
}

export function validateBody(schema: ZodTypeAny): RequestHandler {
  return validate(schema, "body");
}

export function validateQuery(schema: ZodTypeAny): RequestHandler {
  return validate(schema, "query");
}
