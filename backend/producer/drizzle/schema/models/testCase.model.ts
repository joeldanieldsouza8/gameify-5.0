import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  serial,
} from "drizzle-orm/pg-core";
import { questionTable } from "./question.model";

export const testCaseTable = pgTable("testCase", {
  id: serial("id").primaryKey().notNull().unique(),
  input: text("input").notNull(),
  output: text("output").notNull(),
  expectedOutput: text("expectedOutput").notNull(),

  // Foreign key constraints
  questionID: serial("questionID")
    .references(() => questionTable.id)
    .notNull(),
});

// One TestCase has one Question
export const testCaseTableRelations = relations(testCaseTable, ({ one }) => ({
  question: one(questionTable, {
    fields: [testCaseTable.questionID],
    references: [questionTable.id],
  }),
}));

// Define the 'TestCase' type for queried data
export type TestCaseTableType = typeof testCaseTable.$inferSelect;

// Define the 'NewTestCase' type for insert/update operations
export type NewTestCaseTableType = typeof testCaseTable.$inferInsert;
