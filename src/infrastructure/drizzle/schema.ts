import {
  timestamp,
  varchar,
  text,
  pgTable,
  uuid,
  date,
  integer,
  primaryKey,
  boolean,
  numeric,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";

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
  profile_picture: uuid("profile_picture").references(() => files.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// FILES TABLES
export const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  filename: varchar("filename").notNull(),
  url: varchar("url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// PORTFOLIO TABLES
export const portfolio_items = pgTable("portfolio_items", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  user_id: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const portfolio_items_files = pgTable(
  "portfolio_items_files",
  {
    item_id: uuid("item_id")
      .references(() => portfolio_items.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    file_id: uuid("files")
      .references(() => files.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.file_id, table.item_id],
      }),
    };
  }
);

// SKILL TABLES
export const skill_categories = pgTable("skill_categories", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name").notNull(),
});

export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name").notNull(),
  category_id: uuid("category_id")
    .references(() => skill_categories.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
});

export const user_skills = pgTable(
  "user_skills",
  {
    user_id: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
    skill_id: uuid("skill_id")
      .references(() => skills.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.user_id, table.skill_id],
      }),
    };
  }
);

// PROJECT TABLES
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  authorId: uuid("project_id")
    .references(() => users.id, { onDelete: "no action", onUpdate: "cascade" })
    .notNull(),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  status: project_status("status").default("open").notNull(),
  period: integer("period").notNull(), // how long will the project last in days

  max_budget: numeric("max_budget", { precision: 2 }).notNull(),
  min_budget: numeric("min_budget", { precision: 2 }).notNull(),
  currency: varchar("currency").notNull(),

  hide_bids: boolean("hide_bids").default(true).notNull(), // option to publicly display freelancers bids
  bidding_status: varchar("bidding_status").notNull(), // indicates project accepting bids or not

  deleted: boolean("deleted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projects_files = pgTable(
  "projects_files",
  {
    project_id: uuid("project_id")
      .references(() => projects.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    file_id: uuid("files")
      .references(() => files.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.project_id, table.file_id],
      }),
    };
  }
);

export const project_skills = pgTable(
  "project_skills",
  {
    project_id: uuid("project_id")
      .references(() => projects.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    skill_id: uuid("skill_id")
      .references(() => skills.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.project_id, table.skill_id],
      }),
    };
  }
);

export const project_bids = pgTable(
  "project_bids",
  {
    project_id: uuid("project_id")
      .references(() => projects.id, {
        onDelete: "no action",
        onUpdate: "cascade",
      })
      .notNull(),
    user_id: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
    description: text("description").notNull(),
    period: integer("period").default(3).notNull(), // (integer) in days
    bid_amount: numeric("bid_amount").notNull(),
    currency: varchar("currency").notNull(),
    accepted: boolean("accepted"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.project_id, table.user_id],
      }),
    };
  }
);

// MILESTONE TABLES
export const milestones = pgTable(
  "milestones",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    index: integer("index").notNull(),
    project_id: uuid("project_id")
      .references(() => projects.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    title: varchar("title").notNull(),
    description: varchar("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      milestoneIdx: uniqueIndex("milestone_idx").on(table.index, table.project_id),
    };
  }
);

export const milestone_files = pgTable(
  "milestone_files",
  {
    milestone_id: uuid("milestone_id")
      .references(() => milestones.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    file_id: uuid("files")
      .references(() => files.id)
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.file_id, table.milestone_id],
      }),
    };
  }
);
