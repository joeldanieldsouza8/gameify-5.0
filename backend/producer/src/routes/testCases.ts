import { Router } from "express";

const router = Router();

import { testCaseController } from "../controllers/testCase.controllers";

router.get("/:id", testCaseController.getTestCasesByQuestionId); // GET test case by question id

export default router;