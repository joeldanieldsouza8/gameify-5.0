import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";

import {
  questionTable,
  QuestionTableType,
  NewQuestionTableType,
} from "../../drizzle/schema/models/question.model";

import { TopicTagType } from "../../drizzle/schema/enums/enums";

// GET all questions
async function getAllQuestions() {
  console.log("question.services.ts getAllQuestions() called"); // debug
  try {
    const fetchedQuestions: QuestionTableType[] =
      await db.query.questionTable.findMany();
    console.log(
      `Database Fetch: Retrieved ${fetchedQuestions.length} questions.`,
      fetchedQuestions
    ); // debug
    return fetchedQuestions;
  } catch (error) {
    console.error("Error fetching questions from database:", error);
    throw new Error("Error fetching questions from database");
  }
}

// GET question by id
async function getQuestionById(questionId: number) {
  console.log("question.services.ts getQuestionById() called"); // debug
  try {
    const fetchedQuestion: QuestionTableType | undefined =
      await db.query.questionTable.findFirst({
        where: eq(questionTable.id, questionId),
      });

    // Guard clause
    if (!fetchedQuestion) {
      console.error("Question not found in database");
      return null;
    }
    
    console.log("Database Fetch: Retrieved question:", fetchedQuestion); // debug
    return fetchedQuestion || {}; // Provide a default value if fetchedQuestion is undefined
  } catch (error) {
    console.error("Error fetching question from database:", error);
    throw new Error("Error fetching question from database");
  }
}

// GET all questions by topic
async function getQuestionsByTopic(topic: TopicTagType) {
  console.log("question.services.ts getQuestionsByTopic() called"); // debug
  try {
    const fetchedQuestions: QuestionTableType[] =
      await db.query.questionTable.findMany({
        where: eq(questionTable.topicTag, topic),
      });

    console.log(
      `Database Fetch: Retrieved ${fetchedQuestions.length} questions.`,
      fetchedQuestions
    ); // debug
    return fetchedQuestions;
  } catch (error) {
    console.error("Error fetching questions from database:", error);
    throw new Error("Error fetching questions from database");
  }
}

export const questionService = {
  getAllQuestions,
  getQuestionsByTopic,
  getQuestionById,
};
