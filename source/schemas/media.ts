import { Schema } from '@library/schema';
import { Media } from '@prisma/client';
import commonSchema from '@schemas/common';

const mediaSchema: Schema<keyof Media> = new Schema({
	id: commonSchema.get('id'),
	hash: commonSchema.get('hash'),
	type: Schema['defaultSchema'].string().minLength(2).maxLength(16),
	isDeleted: Schema['defaultSchema'].boolean(),
	createdAt: commonSchema.get('datetime')
});

export default mediaSchema;