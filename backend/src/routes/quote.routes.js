import { Router } from "express";
import { submitQuote, getQuotes, getQuote, updateQuoteStatus } from "../controllers/quote.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { uploadQuoteFiles } from "../middleware/upload.middleware.js";

const router = Router();


router.post("/", uploadQuoteFiles, submitQuote);


router.get("/", requireAuth, requireRole("admin", "staff"), getQuotes);
router.get("/:id", requireAuth, requireRole("admin", "staff"), getQuote);
router.patch("/:id/status", requireAuth, requireRole("admin", "staff"), updateQuoteStatus);

export default router;
