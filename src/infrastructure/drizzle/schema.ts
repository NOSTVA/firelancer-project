import { varchar, pgTable, uuid, date, boolean, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

// CUSTOM TYPES
export const user_types = pgEnum("user_type", ["freelancer", "client"]);
export const user_ranks = pgEnum("user_ranks", ["new", "active"]); // user status as freelancer/client
export const user_status = pgEnum("user_status", ["active", "suspended"]); // user status as account
export const project_status = pgEnum("project_status", [
  "open", // projects are open for bidding
  "no_freelancer_selected", // The bidding period has ended and the client did not award the project. The client may award the project to any of the existing bidders.
  "closed", // The client chose to close the project without awarding it.
  "in-progress", // The award has been accepted by the winning freelancer and the project is ongoing.
  "complete", // The project has been marked as Complete.
  "incomplete", // The project was marked as Incomplete as the freelancer was unable to complete it.
]);

// USER TABLES
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  status: user_status("status").default("active").notNull(),
  first_name: varchar("first_name").notNull(),
  last_name: varchar("last_name").notNull(),
  username: varchar("username").unique().notNull(),
  email: varchar("email").unique().notNull(),
  phone: varchar("phone").unique(),
  password: varchar("password").notNull(),
  birthdate: date("birthdate"),

  email_verified: boolean("email_verified").default(false).notNull(),
  phone_verified: boolean("phone_verified").default(false).notNull(),

  user_type: user_types("user_type").notNull(),
  closed: boolean("closed").default(false).notNull(),
  rank: user_ranks("rank").default("new").notNull(),
  title: varchar("title"),
  description: text("description"),
  profile_picture: uuid("profile_picture"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
