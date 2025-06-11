import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getBrainforPublic, shareBrainHandler } from "../controllers/brain.controller";

const router = Router();

router.post("/share", authenticate, shareBrainHandler)
router.get("/:shareId", authenticate, getBrainforPublic)

export default router;