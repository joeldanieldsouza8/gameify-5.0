import { relations } from "drizzle-orm";
import {
  // Core
  pgTable,
  timestamp,
  text,
  integer,
  uuid,
} from "drizzle-orm/pg-core";
import { question } from "./question";
import { user } from "./user";
import { questionPostComment } from "./questionPostComment";

export const questionPost = pgTable("questionPost", {
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  body: text("body").notNull(),
  upvotes: integer("upvotes").notNull().default(0),
  downvotes: integer("downvotes").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),

  // Foreign key constraints
  questionID: uuid("questionID")
    .references(() => question.id)
    .notNull(),
  authorClerkID: text("authorClerkID")
    .references(() => user.clerkID)
    .notNull(),
});

// One QuestionPost belongs to one Question and one User and has many QuestionPostComments
export const questionPostRelations = relations(
  questionPost,
  ({ one, many }) => ({
    question: one(question, {
      fields: [questionPost.questionID],
      references: [question.id],
    }),
    author: one(user, {
      fields: [questionPost.authorClerkID],
      references: [user.clerkID],
    }),
    questionPostComment: many(questionPostComment),
  })
);
