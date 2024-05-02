import { relations } from "drizzle-orm";
import {
  // Core
  pgTable,

  // Attribute types
  varchar,
  timestamp,
  integer,
  uuid,
  text,
} from "drizzle-orm/pg-core";
import { topicTagEnum } from "../enums/enums";
import { user } from "./user";
import { postComment } from "./postComment";

export const post = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  upvotes: integer("upvotes").notNull().default(0),
  downvotes: integer("downvotes").notNull().default(0),
  topicTag: topicTagEnum("topicTag").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),

  // Foreign key constraints
  authorClerkID: text("authorClerkID")
    .references(() => user.clerkID)
    .notNull(),
});

// One Post has one User and many PostComments
export const postRelations = relations(post, ({ one, many }) => ({
  author: one(user, {
    fields: [post.authorClerkID],
    references: [user.clerkID],
  }),
  postComment: many(postComment),
}));
