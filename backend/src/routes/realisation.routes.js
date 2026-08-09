import { Router } from "express";
import controller from "../controllers/realisation.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", requireAuth, requireRole("admin", "staff"), controller.create);
router.put("/:id", requireAuth, requireRole("admin", "staff"), controller.update);
router.delete("/:id", requireAuth, requireRole("admin"), controller.remove);

export default router;
