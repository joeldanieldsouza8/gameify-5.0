import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  serial,
} from "drizzle-orm/pg-core";
import { questionTable } from "./question.model";

export const exampleTable = pgTable("example", {
  id: serial("id").primaryKey().notNull().unique(),
  input: text("input").notNull(),
  output: text("output").notNull(),
  explanation: text("explanation"),

  // Foreign key constraints
  questionID: serial("questionID")
    .references(() => questionTable.id)
    .notNull(),
});

// One Example has one Question
export const exampleTableRelations = relations(exampleTable, ({ one }) => ({
  question: one(questionTable, {
    fields: [exampleTable.questionID],
    references: [questionTable.id],
  }),
}));

// Define the 'ExampleTable' type for queried data
export type ExampleTableType = typeof exampleTable.$inferSelect;

// Define the 'NewExample' type for insert/update operations
export type NewExampleTableType = typeof exampleTable.$inferInsert;
