import { Generated, Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mariadb';

interface RawComment {
	id: Generated<number>;
	post_id: number;
	parent_post_id: number | null;
	author: string;
	password: string;
	content: string;
	is_deleted: Generated<boolean>;
	created_at: Generated<Date>;
}

interface RawMedia {
	id: Generated<number>;
	hash: string;
	type: string;
}

interface RawPost {
	id: Generated<number>;
	slug: string;
	title: string;
	content: string;
	raw_content: string;
	reading_time: number;
	like: number;
	is_deleted: Generated<boolean>;
	published_at: Date | null;
	updated_at: Generated<Date>;
	created_at: Generated<Date>;
}

interface RawPostMedia {
	id: Generated<number>;
	post_id: number;
	media_id: number;
}

interface RawPostTag {
	id: Generated<number>;
	post_id: number;
	tag_id: number;
}

interface RawSeries {
	id: Generated<number>;
	slug: string;
	title: string;
	media_id: number;
	is_deleted: Generated<boolean>;
	created_at: Generated<Date>;
}

interface RawSeriesPost {
	id: Generated<number>;
	series_id: number;
	post_id: number;
}

interface RawSubscriber {
	id: Generated<number>;
	type: number;
	email: string;
	is_unsubscribed: Generated<boolean>;
	created_at: Generated<Date>;
}

interface RawTag {
	id: Generated<number>;
	slug: string;
	title: string;
	is_deleted: Generated<boolean>;
	created_at: Generated<Date>;
}

// TODO: Make interface without underscore

interface Database {
	comment: RawComment;
	media: RawMedia;
	post: RawPost;
	postMedia: RawPostMedia;
	postTag: RawPostTag;
	series: RawSeries;
	seriesPost: RawSeriesPost;
	subscriber: RawSubscriber;
	tag: RawTag;
}

export default new Kysely<Database>({ dialect: new MysqlDialect({ pool: createPool(process['env']['DATABASE_URL']) }) });