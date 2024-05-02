import { relations } from "drizzle-orm";
import {
  // Core
  pgTable,
  timestamp,
  text,
  integer,
  uuid,
} from "drizzle-orm/pg-core";
import { questionPost } from "./questionPost";
import { user } from "./user";

export const questionPostComment = pgTable("questionComment", {
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  body: text("body").notNull(),
  upvotes: integer("upvotes").notNull().default(0),
  downvotes: integer("downvotes").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),

  // Foreign key constraints
  questionPostID: uuid("questionPostID")
    .references(() => questionPost.id)
    .notNull(),
  authorClerkID: text("authorClerkID")
    .references(() => user.clerkID)
    .notNull(),
});

// One QuestionPostComment has one QuestionPost
export const questionPostCommentRelations = relations(
  questionPostComment,
  ({ one }) => ({
    questionPost: one(questionPost, {
      fields: [questionPostComment.questionPostID],
      references: [questionPost.id],
    }),
    author: one(user, {
      fields: [questionPostComment.authorClerkID],
      references: [user.clerkID],
    }),
  })
);
