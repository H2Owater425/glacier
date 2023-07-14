import { Schema } from '@library/schema';
import commonSchema from '@schemas/common';
import postSchema from '@schemas/post';
import mediaSchema from '@schemas/media';

const postMediaSchema: Schema<'id' | 'postId' | 'mediaId'> = new Schema({
	id: commonSchema.get('id'),
	postId: postSchema.get('id'),
	mediaId: mediaSchema.get('id')
});

export default postMediaSchema;