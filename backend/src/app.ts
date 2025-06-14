import express, { urlencoded } from "express";
import authRoutes from "./routes/auth.route"
import contentRoutes from "./routes/content.route"
import brainRoutes from "./routes/brain.routes"

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/content", contentRoutes)
app.use("/api/v1/brain", brainRoutes)

export { app };
