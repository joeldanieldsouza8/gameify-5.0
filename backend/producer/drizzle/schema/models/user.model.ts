import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  index,
  integer,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { questionPostTable } from "./questionPost.model";
import { postTable } from "./post.model";
import { questionTable } from "./question.model";
import { postCommentTable } from "./postComment.model";
import { badgeEnum, roleEnum } from "../enums/enums";
import { answeredQuestionsTable } from "./answeredQuestions.model";
import { questionPostCommentTable } from "./questionPostComment.model";

export const userTable = pgTable(
  "user",
  {
    clerkID: text("clerkID").primaryKey().notNull().unique(),
    username: varchar("username", { length: 255 }).unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    firstName: varchar("firstName", { length: 255 }),
    lastName: varchar("lastName", { length: 255 }),
    badge: badgeEnum("badge").notNull().default("unranked"),
    role: roleEnum("role").notNull().default("user"),
    dailyStreaks: integer("dailyStreaks").notNull().default(0),
    xpPoints: integer("xpPoints").notNull().default(0),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  }
  // (userTable) => {
  //   return {
  //     username: index("usernameIndex").on(userTable.username), // Create an index on the username column for faster lookups
  //   };
  // }
);

export const userTableRelations = relations(userTable, ({ one, many }) => ({
  // questionPost: one(questionPost, {
  //   fields: [user.id],
  //   references: [questionPost.authorID],
  // }),
  questionPost: many(questionPostTable),
  post: many(postTable),
  question: many(questionTable),
  postComment: many(postCommentTable),
  answeredQuestions: one(answeredQuestionsTable),
  questionPostComment: many(questionPostCommentTable),
}));

// Define the 'User' type for queried data
export type UserTableType = typeof userTable.$inferSelect;

// Define the 'NewUser' type for insert/update operations
export type NewUserTableType = typeof userTable.$inferInsert;
