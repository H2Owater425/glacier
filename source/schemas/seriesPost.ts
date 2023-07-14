import { Schema } from '@library/schema';
import commonSchema from '@schemas/common';
import seriesSchema from '@schemas/series';
import postSchema from '@schemas/post';

const seriesPostSchema: Schema<'id' | 'seriesId' | 'postId'> = new Schema({
	id: commonSchema.get('id'),
	seriesId: seriesSchema.get('id'),
	postId: postSchema.get('id')
});

export default seriesPostSchema;