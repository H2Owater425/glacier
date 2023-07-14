import { Schema } from '@library/schema';

const commonSchema: Schema<'id' | 'hash' | 'text' | 'mediumText' | 'datetime' | 'slug' | 'title'> = new Schema({
	id: Schema['defaultSchema'].integer().minimum(1).maximum(Number['MAX_VALUE']),
	hash: Schema['defaultSchema'].string().pattern(/^[0-9a-f]{128}$/),
	text: Schema['defaultSchema'].string().minLength(1).maxLength(65535),
	mediumText: Schema['defaultSchema'].string().minLength(1).maxLength(16777215),
	datetime: Schema['defaultSchema'].string().format('date-time'),
	slug: Schema['defaultSchema'].string().pattern(/^[a-z0-9\-]{1,64}$/),
	title: Schema['defaultSchema'].string().minLength(1).maxLength(128)
});

export default commonSchema;