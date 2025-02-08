import express from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
import { z } from "zod";


// Zod validation here

// Signup endpoint

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 5);
      const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });

      await user.save();
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
});

// Signin Endpoint
router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
      username: username,
    });

    if (!user) {
      return res.status(403).send({
        msg: "Invalid Credentials",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (user && matchPassword) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
      res.status(200).send({
        Msg: "Login successful",
        token: token,
      });
    } else {
      res.status(403).send({
        MSG: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(500).send({
      MSG: "Internal Server error!",
    });
  }
});

export default router;
