import { relations } from "drizzle-orm";
import {
  // Core
  pgTable,
  text,

  //
  uuid,
} from "drizzle-orm/pg-core";
import { question } from "./question";

export const testCase = pgTable("testCase", {
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  input: text("input").notNull(),
  output: text("output").notNull(),
  expectedOutput: text("expectedOutput").notNull(),

  // Foreign key constraints
  questionID: uuid("questionID")
    .references(() => question.id)
    .notNull(),
});

// One TestCase has one Question
export const testCaseRelations = relations(testCase, ({ one }) => ({
  question: one(question, {
    fields: [testCase.questionID],
    references: [question.id],
  }),
}));
