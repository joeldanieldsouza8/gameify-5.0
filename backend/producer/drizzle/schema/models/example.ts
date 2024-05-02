import { relations } from "drizzle-orm";
import {
  // Core
  pgTable,
  text,

  //
  uuid,
} from "drizzle-orm/pg-core";
import { question } from "./question";

export const example = pgTable("example", {
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  input: text("input").notNull(),
  output: text("output").notNull(),
  explanation: text("explanation").notNull(),

  // Foreign key constraints
  questionID: uuid("questionID")
    .references(() => question.id)
    .notNull(),
});

// One Example has one Question
export const exampleRelations = relations(example, ({ one }) => ({
  question: one(question, {
    fields: [example.questionID],
    references: [question.id],
  }),
}));
