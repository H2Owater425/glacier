import { Schema } from '@library/schema';
import { Subscriber } from '@prisma/client';
import commonSchema from '@schemas/common';

const subscriberSchema: Schema<keyof Subscriber> = new Schema({
	id: commonSchema.get('id'),
	type: Schema['defaultSchema'].integer().minimum(0).maximum(4), // TODO: Devise subscriber type
	email: Schema['defaultSchema'].string().format('email'),
	isDeleted: Schema['defaultSchema'].boolean(),
	createdAt: commonSchema.get('datetime')
});

export default subscriberSchema;