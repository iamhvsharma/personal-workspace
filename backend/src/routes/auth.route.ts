import express from "express";
import { loginHandler, signupHandler } from "../controllers/auth.controller";

const router = express.Router();

// Signup endpoint
router.post("/signup", signupHandler);

// Login Endpoint
router.post("/login", loginHandler);

export default router;
