import { varchar, pgTable, uuid } from "drizzle-orm/pg-core";

// USER TABLES
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  username: varchar("username").notNull(),
});
