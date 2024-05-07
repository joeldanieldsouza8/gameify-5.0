import {
  // Core
  pgTable,
  text,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { questionTable } from "./question.model";

export const constraintsTable = pgTable("constraints", {
  id: serial("id").primaryKey().notNull().unique(),
  bulletPoints: text("bulletPoints").notNull(),

  // Foreign key constraints
  questionID: serial("questionID")
    .references(() => questionTable.id)
    .notNull(),
});

export const constraintsTableRelations = relations(
  constraintsTable,
  ({ one }) => ({
    question: one(questionTable, {
      fields: [constraintsTable.questionID],
      references: [questionTable.id],
    }),
  })
);

// Define the 'constraintsTable' type for queried data
export type ConstraintsTableType = typeof constraintsTable.$inferSelect;

// Define the 'NewconstraintsTable' type for insert/update operations
export type NewConstraintsTableType = typeof constraintsTable.$inferInsert;
