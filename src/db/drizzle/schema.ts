import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * This table stores quotes submitted by users.
 */
export const UserMessages = pgTable("user_messages", {
  id: serial("id").primaryKey().notNull(),
  // This will be the user ID provided by Clerk
  user_id: text("user_id").notNull(),
  createTs: timestamp("create_ts").defaultNow().notNull(),
  message: text("message").notNull(),
});
