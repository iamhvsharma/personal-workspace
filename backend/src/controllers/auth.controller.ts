import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  LoginInput,
  loginSchema,
  SignupInput,
  signupSchema,
} from "../types/zodSchemas";

export const signupHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Zod validation here
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      status: "error",
      message: "Invalid input",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const { username, email, password }: SignupInput = result.data;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });

      res.status(200).send({
        MSG: "Signup Successful.",
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(403).send({
        MSG: "User already exits",
      });
    }
  } catch (error) {
    res.status(500).send({
      MSG: "Internal Server error",
      Error: error,
    });
  }
};

export const loginHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      status: "error",
      message: "Invalid input",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const { email, password }: LoginInput = result.data;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      res.status(403).send({
        msg: "Invalid Credentials",
      });
      return;
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (user && matchPassword) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
      res.status(200).send({
        Msg: "Login successful",
        token: token,
      });
      return;
    } else {
      res.status(403).send({
        MSG: "Invalid Credentials",
      });
      return;
    }
  } catch (error) {
    res.status(500).send({
      MSG: "Internal Server error!",
    });
    return;
  }
};
