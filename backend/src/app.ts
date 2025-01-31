import express, { urlencoded } from "express";
import authRoutes from "./routes/auth.route"

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes)

export { app };
