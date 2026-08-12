import { Router } from "express";
import { adminLogin, login, me, setupAdmin, signup } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Public user accounts always receive the customer role.
router.post("/signup", signup);
router.post("/login", login);

// The setup key makes initial admin creation deliberate and private.
router.post("/setup-admin", setupAdmin);
router.post("/admin/login", adminLogin);
router.get("/me", requireAuth, me);

export default router;
