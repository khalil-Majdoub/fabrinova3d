import { Router } from "express";
import { subscribe, getSubscribers } from "../controllers/newsletter.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", subscribe);
router.get("/", requireAuth, requireRole("admin"), getSubscribers);

export default router;
