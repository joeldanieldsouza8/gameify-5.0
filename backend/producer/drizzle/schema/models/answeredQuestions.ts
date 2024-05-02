import { relations } from "drizzle-orm";
import {
  // Core
  pgTable,
  integer,

  //
  uuid,
  text,
} from "drizzle-orm/pg-core";
import { user } from "./user";

export const answeredQuestions = pgTable("answeredQuestions", {
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  totalQuestionsAnswered: integer("totalQuestionsAnswered")
    .notNull()
    .default(0),

  // Foreign key constraints
  userClerkID: text("userClerkID")
    .references(() => user.clerkID)
    .notNull(),
});

// One AnsweredQuestions belongs to one Profile
export const answeredQuestionsRelations = relations(
  answeredQuestions,
  ({ one }) => ({
    user: one(user, {
      fields: [answeredQuestions.userClerkID],
      references: [user.clerkID],
    }),
  })
);
