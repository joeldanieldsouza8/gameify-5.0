import { relations } from "drizzle-orm";
import {
  // Core
  pgTable,
  timestamp,
  text,
  integer,
  serial,
} from "drizzle-orm/pg-core";
import { postTable } from "./post.model";
import { userTable } from "./user.model";

export const postCommentTable = pgTable("comment", {
  id: serial("id").primaryKey().notNull().unique(),
  body: text("body").notNull(),
  upvotes: integer("upvotes").notNull().default(0),
  downvotes: integer("downvotes").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),

  // Foreign key constraints
  postID: serial("postID")
    .references(() => postTable.id)
    .notNull(),
  authorClerkID: text("authorClerkID")
    .references(() => userTable.clerkID)
    .notNull(),
});

// One PostComment belongs to one Post and one User
export const postCommentTableRelations = relations(
  postCommentTable,
  ({ one }) => ({
    post: one(postTable, {
      fields: [postCommentTable.postID],
      references: [postTable.id],
    }),
    author: one(userTable, {
      fields: [postCommentTable.authorClerkID],
      references: [userTable.clerkID],
    }),
  })
);
