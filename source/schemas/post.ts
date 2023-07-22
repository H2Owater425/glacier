import { Schema } from '@library/schema';
import { Post } from '@prisma/client';
import commonSchema from '@schemas/common';

const postSchema: Schema<keyof Post> = new Schema({
	id: commonSchema.get('id'),
	slug: commonSchema.get('slug'),
	title: commonSchema.get('title'),
	summary: Schema['defaultSchema'].string().minLength(1).maxLength(192),
	content: commonSchema.get('mediumText'),
	rawContent: commonSchema.get('mediumText'),
	readingTime: commonSchema.get('id'),
	like: Schema['defaultSchema'].integer().minimum(0).maximum(Number['MAX_VALUE']),
	isDeleted: Schema['defaultSchema'].boolean(),
	publishedAt: Schema['defaultSchema'].anyOf([commonSchema.get('datetime'), Schema['defaultSchema'].null()]),
	updatedAt: commonSchema.get('datetime'),
	createdAt: commonSchema.get('datetime')
});

export default postSchema;