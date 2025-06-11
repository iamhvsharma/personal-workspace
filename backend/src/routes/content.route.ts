import express from "express";
import { addContentHandler, getContentHandler } from "../controllers/content.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authenticate, addContentHandler);
router.get("/", authenticate, getContentHandler);

export default router;
