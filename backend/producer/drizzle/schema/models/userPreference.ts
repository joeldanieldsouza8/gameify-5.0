import {
  // Core
  pgTable,
  timestamp,
  boolean,

  //
  uuid,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";

export const userPreference = pgTable("userPreference", {
  id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
  emailNotification: boolean("emailNotification").notNull().default(false),
  darkMode: boolean("darkMode").notNull().default(false),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),

  // Foreign key constraints
  userClerkID: text("userClerkID")
    .references(() => user.clerkID)
    .notNull(),
});

// One UserPreference belongs to one Profile
export const userPreferenceRelations = relations(userPreference, ({ one }) => ({
  user: one(user, {
    fields: [userPreference.userClerkID],
    references: [user.clerkID],
  }),
}));
