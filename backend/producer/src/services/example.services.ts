import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";

import {
  exampleTable,
  ExampleTableType,
  NewExampleTableType,
} from "../../drizzle/schema/models/example.model";
import {
  questionTable,
  QuestionTableType,
  NewQuestionTableType,
} from "../../drizzle/schema/models/question.model";

// GET all examples by question id
async function getExamplesByQuestionId(questionId: number) {
  console.log("example.services.ts getExampleByQuestionId() called"); // debug
  try {
    const fetchedExample: ExampleTableType[] | undefined =
      await db.query.exampleTable.findMany({
        where: eq(exampleTable.questionID, questionId),
      });

    // Guard clause
    if (!fetchedExample) {
      console.error("Example not found in database");

      // Return null if no example is found
      return null;
    }

    console.log("Database Fetch: Retrieved example:", fetchedExample); // debug
    return fetchedExample || {}; // Provide a default value if fetchedExample is undefined
  } catch (error) {
    console.error("Error fetching example from database:", error);
    throw new Error("Error fetching example from database");
  }
}

export const exampleService = {
  getExamplesByQuestionId,
};
