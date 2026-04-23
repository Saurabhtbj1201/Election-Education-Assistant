import { Router } from "express";
import { z } from "zod";
import { validateQuery } from "../middleware/validate.js";
import { getTimeline } from "../services/firestore.js";

const querySchema = z.object({
  state: z.string().trim().min(2).optional()
});

export const timelineRouter = Router();

timelineRouter.get("/", validateQuery(querySchema), async (req, res, next) => {
  try {
    const query = querySchema.parse(req.query);
    const items = await getTimeline(query.state);

    res.json({ items });
  } catch (error) {
    next(error);
  }
});
