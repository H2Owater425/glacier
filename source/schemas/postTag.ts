import { Schema } from '@library/schema';
import { PostTag } from '@prisma/client';
import commonSchema from '@schemas/common';
import postSchema from '@schemas/post';
import tagSchema from '@schemas/tag';

const postTagSchema: Schema<keyof PostTag> = new Schema({
	id: commonSchema.get('id'),
	postId: postSchema.get('id'),
	tagId: tagSchema.get('id')
});

export default postTagSchema;