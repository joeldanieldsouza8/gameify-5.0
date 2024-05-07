import { relations } from "drizzle-orm";
import {
  // Core
  pgTable,
  timestamp,
  text,
  integer,
  serial,
} from "drizzle-orm/pg-core";
import { questionPostTable } from "./questionPost.model";
import { userTable } from "./user.model";

export const questionPostCommentTable = pgTable("questionComment", {
  id: serial("id").primaryKey().notNull().unique(),
  body: text("body").notNull(),
  upvotes: integer("upvotes").notNull().default(0),
  downvotes: integer("downvotes").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),

  // Foreign key constraints
  questionPostID: serial("questionPostID")
    .references(() => questionPostTable.id)
    .notNull(),
  authorClerkID: text("authorClerkID")
    .references(() => userTable.clerkID)
    .notNull(),
});

// One QuestionPostComment has one QuestionPost
export const questionPostCommentTableRelations = relations(
  questionPostCommentTable,
  ({ one }) => ({
    questionPost: one(questionPostTable, {
      fields: [questionPostCommentTable.questionPostID],
      references: [questionPostTable.id],
    }),
    author: one(userTable, {
      fields: [questionPostCommentTable.authorClerkID],
      references: [userTable.clerkID],
    }),
  })
);
