import {
  pgTable,
  varchar,
  timestamp,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const topicTable = pgTable("topic", {
  id: serial("id").primaryKey().notNull().unique(),
  title: varchar("title", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  href: text("href").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Define the 'Topic' type for queried data
export type TopicTableType = typeof topicTable.$inferSelect;

// Define the 'NewTopic' type for insert/update operations
export type NewTopicTableType = typeof topicTable.$inferInsert;