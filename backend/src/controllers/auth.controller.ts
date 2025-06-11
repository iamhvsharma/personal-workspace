import express, { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

export const signupHandler = async (req: Request, res: Response) => {
  
  const { username, email, password } = req.body;

  // Zod validation here
  const requiredBody = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(8).max(40),
  });

  const safeParsedBody = requiredBody.safeParse(req.body);

  if (!safeParsedBody.success) {
    res.json({
      msg: "Incorrect Format",
      error: safeParsedBody.error,
    });
    return;
  }

  try {
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

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

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
