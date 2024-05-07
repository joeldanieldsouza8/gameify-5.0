import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { userTable } from "./user.model";

export const answeredQuestionsTable = pgTable("answeredQuestions", {
  id: serial("id").primaryKey().notNull().unique(),
  totalQuestionsAnswered: integer("totalQuestionsAnswered")
    .notNull()
    .default(0),

  // Foreign key constraints
  userClerkID: text("userClerkID")
    .references(() => userTable.clerkID)
    .notNull(),
});

// One AnsweredQuestions belongs to one Profile
export const answeredQuestionsTableRelations = relations(
  answeredQuestionsTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [answeredQuestionsTable.userClerkID],
      references: [userTable.clerkID],
    }),
  })
);

// Define the 'answeredQuestionsTable' type for queried data
export type AnsweredQuestionsTableType = typeof answeredQuestionsTable.$inferSelect;

// Define the 'NewansweredQuestionsTable' type for insert/update operations
export type NewAnsweredQuestionsTableType = typeof answeredQuestionsTable.$inferInsert;
