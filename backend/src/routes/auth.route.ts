import express from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

const router = express.Router();

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
      res.status(201).send({
        MSG: "Signup Successful.",
      });
    } else {
      res.status(403).send({
        MSG: "User already exits",
      });
    }
  } catch (error) {
    res.status(501).send({
      MSG: "Internal Server error",
      Error: error,
    });
  }
});

export default router;
