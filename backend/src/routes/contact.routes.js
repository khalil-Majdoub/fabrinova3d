import { Router } from "express";
import { submitContact, getMessages } from "../controllers/contact.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", submitContact);
router.get("/", requireAuth, requireRole("admin", "staff"), getMessages);

export default router;
