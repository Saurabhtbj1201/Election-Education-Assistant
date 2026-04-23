import { Router } from "express";
import { z } from "zod";
import { validateQuery } from "../middleware/validate.js";
import { getProcessSteps } from "../services/firestore.js";

const querySchema = z.object({
  state: z.string().trim().min(2).optional()
});

export const processRouter = Router();

processRouter.get("/", validateQuery(querySchema), async (req, res, next) => {
  try {
    const query = querySchema.parse(req.query);
    const steps = await getProcessSteps(query.state);

    res.json({
      state: query.state ?? "default",
      steps
    });
  } catch (error) {
    next(error);
  }
});
