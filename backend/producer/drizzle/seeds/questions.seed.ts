import { db } from "../db";
import questionsData from "./data/questions.json";
import { questionTable, NewQuestionTableType, QuestionTableType } from "../schema/models/question.model";

export async function seedQuestions() {
  const questions = questionsData as NewQuestionTableType[];

  for (const question of questions) {
    await db.insert(questionTable).values(question).returning();
  }
}