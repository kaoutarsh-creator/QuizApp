import express from "express";
import {
  createQuiz,
  getQuizzes,
  submitQuiz,
  updateQuiz,
  deleteQuiz,
  addQuestion
} from "../controllers/quizController.js";

const router = express.Router();

router.post("/", createQuiz);
router.get("/", getQuizzes);

router.post("/submit", submitQuiz);

router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

router.post("/question", addQuestion);

export default router;