import {
  pgTable,
  timestamp,
  boolean,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userTable } from "./user.model";

export const userPreferenceTable = pgTable("userPreference", {
  id: serial("id").primaryKey().notNull().unique(),
  emailNotification: boolean("emailNotification").notNull().default(false),
  darkMode: boolean("darkMode").notNull().default(false),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),

  // Foreign key constraints
  userClerkID: text("userClerkID")
    .references(() => userTable.clerkID)
    .notNull(),
});

// One UserPreference belongs to one Profile
export const userPreferenceTableRelations = relations(userPreferenceTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userPreferenceTable.userClerkID],
    references: [userTable.clerkID],
  }),
}));
