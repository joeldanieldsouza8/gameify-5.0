import {
  // Core
  pgTable,

  // Attribute types
  varchar,
  boolean,

  //
  uuid,
} from "drizzle-orm/pg-core";

export const admin = pgTable("admin", {
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  canCreateQuestions: boolean("canCreateQuestions").notNull().default(false),
  canDeleteQuestions: boolean("canDeleteQuestions").notNull().default(false),
  canEditQuestions: boolean("canEditQuestions").notNull().default(false),
});
