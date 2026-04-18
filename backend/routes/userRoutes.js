import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

const profile = (req, res) => {
    return res.json(req.user);
}

router.get("/profile",protect, profile);

export default router;
