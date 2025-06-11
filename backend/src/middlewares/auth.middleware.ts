import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];

    if (!header) {
      res.status(401).json({
        error: "No token provided",
      });
      return;
    }

    // Remove 'Bearer ' from token if present
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;

    const decoded = jwt.verify(token, JWT_SECRET as string);

    if (decoded) {
      req.userId = (decoded as JwtPayload).id;
      next();
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        error: "Invalid token",
      });
      return;
    }

    res.status(500).json({
      error: "Internal server error",
    });
    return;
  }
};
