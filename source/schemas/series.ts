import { Schema } from '@library/schema';
import { Series } from '@prisma/client';
import commonSchema from '@schemas/common';
import mediaSchema from '@schemas/media';

const seriesSchema: Schema<keyof Series> = new Schema({
	id: commonSchema.get('id'),
	slug: commonSchema.get('slug'),
	title: commonSchema.get('title'),
	mediaId: Schema['defaultSchema'].anyOf([mediaSchema.get('id'), Schema['defaultSchema'].null()]),
	isDeleted: Schema['defaultSchema'].boolean(),
	createdAt: commonSchema.get('datetime')
});

export default seriesSchema;