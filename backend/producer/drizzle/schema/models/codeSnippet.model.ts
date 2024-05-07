import { relations } from "drizzle-orm";
import { pgTable, serial, jsonb } from "drizzle-orm/pg-core";
import { questionTable } from "./question.model";

const codeSnippetTable = pgTable("codeSnippet", {
  id: serial("id").primaryKey().notNull().unique(),
  snippets: jsonb("snippets").notNull(),

  // Foreign key constraints
  questionID: serial("questionID")
    .references(() => questionTable.id)
    .notNull(),
});

// One CodeSnippet belongs to one Question
const codeSnippetTableRelations = relations(
  codeSnippetTable,
  ({ one, many }) => ({
    question: one(questionTable, {
      fields: [codeSnippetTable.questionID],
      references: [questionTable.id],
    }),
  })
);

// Define the 'CodeSnippet' type for queried data
type CodeSnippetTableType = typeof codeSnippetTable.$inferSelect;

// Define the 'NewCodeSnippet' type for insert/update operations
type NewCodeSnippetTableType = typeof codeSnippetTable.$inferInsert;

export { codeSnippetTable, codeSnippetTableRelations, CodeSnippetTableType, NewCodeSnippetTableType };