import { relations } from "drizzle-orm";
import {
  // Core
  pgTable,

  // Attribute types
  varchar,
  timestamp,
  text,
  integer,
  uuid,
} from "drizzle-orm/pg-core";
import { difficultyEnum, topicTagEnum } from "../enums/enums";
import { example } from "./example";
import { questionPost } from "./questionPost";
import { testCase } from "./testCase";
import { user } from "./user";

export const question = pgTable("question", {
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  topicTag: topicTagEnum("topicTag").notNull(),
  xpPoints: integer("xpPoints").notNull(),
  upvotes: integer("upvotes").notNull().default(0),
  downvotes: integer("downvotes").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),

  // Foreign key constraints
  authorClerkID: text("authorClerkID")
    .references(() => user.clerkID)
    .notNull(),
});

// One Question has many TestCases, Examples, and QuestionPosts
export const questionRelations = relations(question, ({ one, many }) => ({
  testCase: many(testCase),
  example: many(example),
  questionPost: many(questionPost),
  author: one(user, {
    fields: [question.authorClerkID],
    references: [user.clerkID],
  }),
}));
