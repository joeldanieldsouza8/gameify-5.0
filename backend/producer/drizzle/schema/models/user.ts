import { relations } from "drizzle-orm";
import {
  // Core
  pgTable,

  // Attribute types
  varchar,
  index,
  integer,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { questionPost } from "./questionPost";
import { post } from "./post";
import { question } from "./question";
import { postComment } from "./postComment";
import { badgeEnum, roleEnum } from "../enums/enums";
import { answeredQuestions } from "./answeredQuestions";
import { questionPostComment } from "./questionPostComment";

export const user = pgTable(
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

export const usersRelations = relations(user, ({ one, many }) => ({
  // questionPost: one(questionPost, {
  //   fields: [user.id],
  //   references: [questionPost.authorID],
  // }),
  questionPost: many(questionPost),
  post: many(post),
  question: many(question),
  postComment: many(postComment),
  answeredQuestions: one(answeredQuestions),
  questionPostComment: many(questionPostComment),
}));

// Define the 'User' type for queried data
export type UserType = typeof user.$inferSelect;

// Define the 'NewUser' type for insert/update operations
export type NewUserType = typeof user.$inferInsert;