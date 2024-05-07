import { Router } from "express";

const router = Router();

import { topicController } from "../controllers/topic.controllers";

router.get("/", topicController.getTopics); // GET all topics

export default router;