import { Router } from "express";
import { z } from "zod";
import { validateQuery } from "../middleware/validate.js";
import { searchFaq, searchGlossary } from "../services/firestore.js";

const querySchema = z.object({
  term: z.string().trim().optional()
});

export const glossaryRouter = Router();

glossaryRouter.get("/", validateQuery(querySchema), async (req, res, next) => {
  try {
    const query = querySchema.parse(req.query);
    const [glossary, faq] = await Promise.all([
      searchGlossary(query.term),
      searchFaq(query.term)
    ]);

    res.json({
      glossary,
      faq
    });
  } catch (error) {
    next(error);
  }
});
