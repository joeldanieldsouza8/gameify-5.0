import { relations } from "drizzle-orm";
import {
  // Core
  pgTable,
  timestamp,
  text,
  integer,
  uuid,
} from "drizzle-orm/pg-core";
import { post } from "./post";
import { user } from "./user";

export const postComment = pgTable("comment", {
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  body: text("body").notNull(),
  upvotes: integer("upvotes").notNull().default(0),
  downvotes: integer("downvotes").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),

  // Foreign key constraints
  postID: uuid("postID")
    .references(() => post.id)
    .notNull(),
  authorClerkID: text("authorClerkID")
    .references(() => user.clerkID)
    .notNull(),
});

// One PostComment belongs to one Post and one User
export const postCommentRelations = relations(postComment, ({ one }) => ({
  post: one(post, {
    fields: [postComment.postID],
    references: [post.id],
  }),
  author: one(user, {
    fields: [postComment.authorClerkID],
    references: [user.clerkID],
  }),
}));
