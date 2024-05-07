import {
  pgTable,
  varchar,
  boolean,
  serial,
} from "drizzle-orm/pg-core";

export const adminTable = pgTable("admin", {
  id: serial("id").primaryKey().notNull().unique(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  canCreateQuestions: boolean("canCreateQuestions").notNull().default(false),
  canDeleteQuestions: boolean("canDeleteQuestions").notNull().default(false),
  canEditQuestions: boolean("canEditQuestions").notNull().default(false),
});
