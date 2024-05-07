import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";

import { testCaseTable, TestCaseTableType, NewTestCaseTableType } from "../../drizzle/schema/models/testCase.model";
import {
  questionTable,
  QuestionTableType,
  NewQuestionTableType,
} from "../../drizzle/schema/models/question.model";

// GET all test cases by question id
async function getTestCasesByQuestionId(questionId: number) {
  console.log("testCase.services.ts getTestCaseByQuestionId() called"); // debug
  try {
    const fetchedTestCase: TestCaseTableType[] | undefined =
      await db.query.testCaseTable.findMany({
        where: eq(testCaseTable.questionID, questionId),
      });

    // Guard clause
    if (!fetchedTestCase) {
      console.error("Test case not found in database");

      // Return null if no test case is found
      return null;
    }

    console.log("Database Fetch: Retrieved test case:", fetchedTestCase); // debug
    return fetchedTestCase || {}; // Provide a default value if fetchedTestCase is undefined
  } catch (error) {
    console.error("Error fetching test case from database:", error);
    throw new Error("Error fetching test case from database");
  }
}

export const testCaseService = {
  getTestCasesByQuestionId,
};