import { Router } from "express";

const router = Router();

import { codeSnippetController } from "../controllers/codeSnippet.controllers";

router.get("/:id", codeSnippetController.getCodeSnippetByQuestionId); // GET code snippet by question id

export default router;