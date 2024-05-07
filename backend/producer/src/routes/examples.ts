import { Router } from "express";

const router = Router();

import { exampleController } from "../controllers/example.controllers";

router.get("/:id", exampleController.getExampleByQuestionId); // GET example by question id

export default router;