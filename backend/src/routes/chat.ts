import { Router } from "express";
import { z } from "zod";
import { validateBody } from "../middleware/validate.js";
import { askGroundedQuestion } from "../services/vertex.js";

const bodySchema = z.object({
  question: z.string().trim().min(8).max(600),
  state: z.string().trim().min(2).max(80).optional()
});

export const chatRouter = Router();

chatRouter.post("/", validateBody(bodySchema), async (req, res, next) => {
  try {
    const body = bodySchema.parse(req.body);
    const result = await askGroundedQuestion(body.question, body.state);

    res.json(result);
  } catch (error) {
    next(error);
  }
});
