import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createTutorial,
  getTutorials,
  getTutorialById,
  updateTutorial,
  deleteTutorial,
} from "../controllers/tutorialController.js";

const router = express.Router();

router.route("/")
  .post(protect, createTutorial)
  .get(getTutorials);

router.route("/:id")
  .get(getTutorialById)
  .put(protect, updateTutorial)
  .delete(protect, deleteTutorial);

export default router;