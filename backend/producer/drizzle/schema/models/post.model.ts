import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  integer,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { topicTagEnum } from "../enums/enums";
import { userTable } from "./user.model";
import { postCommentTable } from "./postComment.model";

export const postTable = pgTable("post", {
  id: serial("id").primaryKey().notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  upvotes: integer("upvotes").notNull().default(0),
  downvotes: integer("downvotes").notNull().default(0),
  topicTag: topicTagEnum("topicTag").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),

  // Foreign key constraints
  authorClerkID: text("authorClerkID")
    .references(() => userTable.clerkID)
    .notNull(),
});

// One Post has one User and many PostComments
export const postTableRelations = relations(postTable, ({ one, many }) => ({
  author: one(userTable, {
    fields: [postTable.authorClerkID],
    references: [userTable.clerkID],
  }),
  postComment: many(postCommentTable),
}));

// Define the 'postTable' type for queried data
export type PostTableType = typeof postTable.$inferSelect;

// Define the 'NewPostType' type for new data
export type NewPostTableType = typeof postTable.$inferInsert;
