import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  text,
  integer,
  serial,
} from "drizzle-orm/pg-core";
import { difficultyEnum, topicTagEnum } from "../enums/enums";
import { exampleTable } from "./example.model";
import { questionPostTable } from "./questionPost.model";
import { testCaseTable } from "./testCase.model";
import { userTable } from "./user.model";
import { codeSnippetTable } from "./codeSnippet.model";

export const questionTable = pgTable("question", {
  id: serial("id").primaryKey().notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  topicTag: topicTagEnum("topicTag").notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  xpPoints: integer("xpPoints").notNull(),
  upvotes: integer("upvotes").notNull().default(0),
  downvotes: integer("downvotes").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),

  // Foreign key constraints
  authorClerkID: text("authorClerkID")
    .references(() => userTable.clerkID)
    .notNull(),
});

// One Question has many TestCases, Examples, and QuestionPosts
export const questionTableRelations = relations(
  questionTable,
  ({ one, many }) => ({
    testCase: many(testCaseTable),
    example: many(exampleTable),
    questionPost: many(questionPostTable),
    author: one(userTable, {
      fields: [questionTable.authorClerkID],
      references: [userTable.clerkID],
    }),
    codeSnippet: many(codeSnippetTable),
  })
);

// Define the 'Question' type for queried data
export type QuestionTableType = typeof questionTable.$inferSelect;

// Define the 'NewQuestion' type for insert/update operations
export type NewQuestionTableType = typeof questionTable.$inferInsert;
