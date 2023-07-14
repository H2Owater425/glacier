import { Schema } from '@library/schema';
import commonSchema from '@schemas/common';

const mediaSchema: Schema<'id' | 'hash' | 'type'> = new Schema({
	id: commonSchema.get('id'),
	hash: commonSchema.get('hash'),
	type: Schema['defaultSchema'].string().minLength(2).maxLength(16)
});

export default mediaSchema;