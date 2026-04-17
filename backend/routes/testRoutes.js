import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/create", async (req, res) => {
  try {
    const user = await User.create({
      name: "Test User",
      email: "test@gmail.com",
      password: "123456",
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;