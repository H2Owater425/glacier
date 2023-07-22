import { PageQuery, Schema } from '@library/schema';

const pageSchema: Schema<keyof PageQuery> = new Schema({
	'page[size]': Schema['defaultSchema'].integer().minimum(1).maximum(64).default(32),
	'page[index]': Schema['defaultSchema'].integer().minimum(0).maximum(Number['MAX_VALUE']).default(0),
	'page[order]': Schema['defaultSchema'].string().enum(['desc', 'asc']).default('desc')
});

export default pageSchema;