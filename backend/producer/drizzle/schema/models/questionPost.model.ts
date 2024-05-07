import { relations } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  text,
  integer,
  serial,
} from "drizzle-orm/pg-core";
import { questionTable } from "./question.model";
import { userTable } from "./user.model";
import { questionPostCommentTable } from "./questionPostComment.model";

export const questionPostTable = pgTable("questionPost", {
  id: serial("id").primaryKey().notNull().unique(),
  body: text("body").notNull(),
  upvotes: integer("upvotes").notNull().default(0),
  downvotes: integer("downvotes").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),

  // Foreign key constraints
  questionID: serial("questionID")
    .references(() => questionTable.id)
    .notNull(),
  authorClerkID: text("authorClerkID")
    .references(() => userTable.clerkID)
    .notNull(),
});

// One QuestionPost belongs to one Question and one User and has many QuestionPostComments
export const questionPostTableRelations = relations(
  questionPostTable,
  ({ one, many }) => ({
    question: one(questionTable, {
      fields: [questionPostTable.questionID],
      references: [questionTable.id],
    }),
    author: one(userTable, {
      fields: [questionPostTable.authorClerkID],
      references: [userTable.clerkID],
    }),
    questionPostComment: many(questionPostCommentTable),
  })
);
