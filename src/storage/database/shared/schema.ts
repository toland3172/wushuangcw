import { pgTable, serial, timestamp, index, unique, varchar, text, foreignKey, integer, boolean, primaryKey, customType } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


const tsvector = customType<{ data: string }>({
  dataType() { return 'tsvector'; }
});

export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const categories = pgTable("categories", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	slug: varchar({ length: 100 }).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("categories_slug_idx").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	unique("categories_slug_key").on(table.slug),
]);

export const tags = pgTable("tags", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	slug: varchar({ length: 50 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("tags_slug_idx").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	unique("tags_slug_key").on(table.slug),
]);

export const posts = pgTable("posts", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull(),
	content: text().notNull(),
	excerpt: text("excerpt"),
	cover_image: varchar("cover_image", { length: 500 }),
	category_id: integer("category_id"),
	published: boolean().default(false).notNull(),
	author: varchar("author", { length: 100 }).default("wushuang"),
	view_count: integer("view_count").default(0).notNull(),
	published_at: timestamp("published_at", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	fts: tsvector("fts").generatedAlwaysAs(sql`to_tsvector('english'::regconfig, (((COALESCE(title, ''::character varying))::text || ' '::text) || COALESCE(content, ''::text)))`),
}, (table) => [
	index("posts_category_id_idx").using("btree", table.category_id.asc().nullsLast().op("int4_ops")),
	index("posts_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("posts_fts_idx").using("gin", table.fts.asc().nullsLast().op("tsvector_ops")),
	index("posts_published_idx").using("btree", table.published.asc().nullsLast().op("bool_ops")),
	index("posts_slug_idx").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	index("posts_view_count_idx").using("btree", table.view_count.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.category_id],
			foreignColumns: [categories.id],
			name: "posts_category_id_fkey"
		}).onDelete("set null"),
	unique("posts_slug_key").on(table.slug),
]);

export const postTags = pgTable("post_tags", {
	postId: integer("post_id").notNull(),
	tagId: integer("tag_id").notNull(),
}, (table) => [
	index("post_tags_post_id_idx").using("btree", table.postId.asc().nullsLast().op("int4_ops")),
	index("post_tags_tag_id_idx").using("btree", table.tagId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.id],
			name: "post_tags_post_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tagId],
			foreignColumns: [tags.id],
			name: "post_tags_tag_id_fkey"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.postId, table.tagId], name: "post_tags_pkey"}),
]);

export const comments = pgTable("comments", {
  id: serial().primaryKey().notNull(),
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  authorName: varchar("author_name", { length: 100 }).notNull(),
  content: text().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
});
