import { Request, Response } from "express";

import { codeSnippetService } from "../services/codeSnippet.services";

import {
  CodeSnippetTableType,
  NewCodeSnippetTableType,
} from "../../drizzle/schema/models/codeSnippet.model";

// GET code snippet by question id
async function getCodeSnippetByQuestionId(req: Request, res: Response) {
  try {
    console.log("Fetching code snippet by question id"); // debug
    const questionId = parseInt(req.params.id);
    console.log("Question ID:", questionId); // debug

    // Fetch code snippet by question id from the database
    const fetchedCodeSnippet =
      await codeSnippetService.getCodeSnippetByQuestionId(questionId);

    // Guard clause
    if (!fetchedCodeSnippet) {
      console.error("Code snippet not found in database");

      return res.status(404).json({
        success: false,
        data: null,
        message: "Code snippet not found in database",
      });
    }

    console.log("Fetched code snippet:", fetchedCodeSnippet); // debug

    return res.status(200).json({ success: true, data: fetchedCodeSnippet });
  } catch (error) {
    console.error("Error fetching code snippet from database:", error);

    return res.status(500).json({
      success: false,
      data: null,
      message: "Unable to get code snippet from database",
    });
  }
}

export const codeSnippetController = {
  getCodeSnippetByQuestionId,
};
