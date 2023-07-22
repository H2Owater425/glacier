import { Schema } from '@library/schema';
import { PostMedia } from '@prisma/client';
import commonSchema from '@schemas/common';
import postSchema from '@schemas/post';
import mediaSchema from '@schemas/media';

const postMediaSchema: Schema<keyof PostMedia> = new Schema({
	id: commonSchema.get('id'),
	postId: postSchema.get('id'),
	mediaId: mediaSchema.get('id')
});

export default postMediaSchema;