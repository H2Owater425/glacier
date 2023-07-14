import { Schema } from '@library/schema';
import commonSchema from '@schemas/common';
import postSchema from '@schemas/post';
import tagSchema from '@schemas/tag';

const postTagSchema: Schema<'id' | 'postId' | 'tagId'> = new Schema({
	id: commonSchema.get('id'),
	postId: postSchema.get('id'),
	tagId: tagSchema.get('id')
});

export default postTagSchema;