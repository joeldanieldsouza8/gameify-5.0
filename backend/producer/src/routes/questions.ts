import { Router } from "express";

const router = Router();

import { questionController } from "../controllers/question.controllers";

router.get("/", questionController.getAllQuestions); // GET all questions
router.get("/topics/:topic", questionController.getQuestionsByTopic); // GET questions by topic
router.get("/:id", questionController.getQuestionById); // GET question by id

export default router;