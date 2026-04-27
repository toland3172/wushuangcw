import { pgTable, serial, timestamp, index, unique, varchar, text, foreignKey, integer, boolean, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const healthCheck = pgTable("health_check", {
  id: serial().primaryKey(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
  index("categories_slug_idx").on(table.slug),
  unique("categories_slug_key").on(table.slug),
]);

export const tags = pgTable("tags", {
  id: serial().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
  index("tags_slug_idx").on(table.slug),
  unique("tags_slug_key").on(table.slug),
]);

export const posts = pgTable("posts", {
  id: serial().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: varchar("cover_image", { length: 500 }),
  categoryId: integer("category_id").references(() => categories.id, { onDelete: "set null" }),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  fts: sql`tsvector generated always as (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, ''))) stored`,
}, (table) => [
  index("posts_category_id_idx").on(table.categoryId),
  index("posts_created_at_idx").on(table.createdAt),
  index("posts_published_idx").on(table.published),
  index("posts_slug_idx").on(table.slug),
  unique("posts_slug_key").on(table.slug),
]);

export const postTags = pgTable("post_tags", {
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  tagId: integer("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
}, (table) => [
  index("post_tags_post_id_idx").on(table.postId),
  index("post_tags_tag_id_idx").on(table.tagId),
  primaryKey({ columns: [table.postId, table.tagId], name: "post_tags_pkey" }),
]);
