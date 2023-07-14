import { Schema } from '@library/schema';
import commonSchema from '@schemas/common';
import postSchema from '@schemas/post';

const commentSchema: Schema<'id' | 'postId' | 'parentCommentId' | 'author' | 'password' | 'content' | 'isDeleted' | 'createdAt'> = new Schema({
	id: commonSchema.get('id'),
	postId: postSchema.get('id'),
	parentCommentId: commonSchema.get('id'),
	author: schema.string().minLength(1).maxLength(16),
	password: schema.string(),
	content: commonSchema.get('text'),
	isDeleted: schema.boolean(),
	createdAt: commonSchema.get('datetime')
});

export default commentSchema;