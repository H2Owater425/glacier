import { Schema } from '@library/schema';
import commonSchema from '@schemas/common';

const postSchema: Schema<'id' | 'slug' | 'title' | 'content' | 'rawContent' | 'readingTime' | 'like' | 'publishedAt' | 'updatedAt' | 'createdAt'> = new Schema({
	id: commonSchema.get('id'),
	slug: commonSchema.get('slug'),
	title: commonSchema.get('title'),
	content: commonSchema.get('mediumText'),
	rawContent: commonSchema.get('mediumText'),
	readingTime: commonSchema.get('id'),
	like: Schema['defaultSchema'].integer().minimum(0).maximum(Number['MAX_VALUE']),
	publishedAt: Schema['defaultSchema'].anyOf([commonSchema.get('datetime'), Schema['defaultSchema'].null()]),
	updatedAt: commonSchema.get('datetime'),
	createdAt: commonSchema.get('datetime')
});

export default postSchema;