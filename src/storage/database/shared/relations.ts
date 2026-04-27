import { relations } from "drizzle-orm/relations";
import { categories, posts, postTags, tags } from "./schema";

export const postsRelations = relations(posts, ({one, many}) => ({
	category: one(categories, {
		fields: [posts.categoryId],
		references: [categories.id]
	}),
	postTags: many(postTags),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	posts: many(posts),
}));

export const postTagsRelations = relations(postTags, ({one}) => ({
	post: one(posts, {
		fields: [postTags.postId],
		references: [posts.id]
	}),
	tag: one(tags, {
		fields: [postTags.tagId],
		references: [tags.id]
	}),
}));

export const tagsRelations = relations(tags, ({many}) => ({
	postTags: many(postTags),
}));