import { Schema } from '@library/schema';
import schema from 'fluent-json-schema';
import commonSchema from '@schemas/common';
import mediaSchema from '@schemas/media';

const tagSchema: Schema<'id' | 'slug' | 'title' | 'mediaId' | 'isDeleted' | 'createdAt'> = new Schema({
	id: commonSchema.get('id'),
	slug: commonSchema.get('slug'),
	title: commonSchema.get('title'),
	mediaId: schema.anyOf([mediaSchema.get('id'), schema.null()]),
	isDeleted: schema.boolean(),
	createdAt: commonSchema.get('datetime')
});

export default tagSchema;