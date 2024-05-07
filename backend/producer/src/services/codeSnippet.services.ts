import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";

import {
  codeSnippetTable,
  CodeSnippetTableType,
  NewCodeSnippetTableType,
} from "../../drizzle/schema/models/codeSnippet.model";
import {
  questionTable,
  QuestionTableType,
  NewQuestionTableType,
} from "../../drizzle/schema/models/question.model";

// GET code snippet by question id
async function getCodeSnippetByQuestionId(questionId: number) {
  console.log("codeSnippet.services.ts getCodeSnippetByQuestionId() called"); // debug
  try {
    const fetchedCodeSnippet: CodeSnippetTableType | undefined =
      await db.query.codeSnippetTable.findFirst({
        where: eq(codeSnippetTable.questionID, questionId),
      });

    // Guard clause
    if (!fetchedCodeSnippet) {
      console.error("Code snippet not found in database");

      // Return null if no code snippet is found
      return null;
    }

    console.log("Database Fetch: Retrieved code snippet:", fetchedCodeSnippet); // debug
    return fetchedCodeSnippet || {}; // Provide a default value if fetchedCodeSnippet is undefined
  } catch (error) {
    console.error("Error fetching code snippet from database:", error);
    throw new Error("Error fetching code snippet from database");
  }
}

export const codeSnippetService = {
  getCodeSnippetByQuestionId,
};
