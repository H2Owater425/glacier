import { Schema } from '@library/schema';
import { Comment } from '@prisma/client';
import commonSchema from '@schemas/common';
import postSchema from '@schemas/post';

const commentSchema: Schema<keyof Comment> = new Schema({
	id: commonSchema.get('id'),
	postId: postSchema.get('id'),
	parentCommentId: commonSchema.get('id'),
	authorName: Schema['defaultSchema'].string().minLength(1).maxLength(16),
	authorIp: Schema['defaultSchema'].anyOf([Schema['defaultSchema'].string().format('ipv4'), Schema['defaultSchema'].string().format('ipv6')]),
	password: Schema['defaultSchema'].string(),
	content: commonSchema.get('text'),
	isDeleted: Schema['defaultSchema'].boolean(),
	createdAt: commonSchema.get('datetime')
});

export default commentSchema;