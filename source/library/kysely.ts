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

export interface Comment extends Omit<RawComment, 'post_id' | 'parent_post_id' | 'is_deleted' | 'created_at'> {
	postId: RawComment['post_id'];
	parentPostId: RawComment['parent_post_id'];
	isDeleted: RawComment['is_deleted'];
	createdAt: RawComment['created_at'];
}

interface RawMedia {
	id: Generated<number>;
	hash: string;
	type: string;
}

export interface Media extends RawMedia {}

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

export interface Post extends Omit<RawPost, 'raw_content' | 'reading_time' | 'is_deleted' | 'published_at' | 'updated_at' | 'created_at'> {
	rawContent: RawPost['raw_content'];
	readingTime: RawPost['reading_time'];
	isDeleted: RawPost['is_deleted'];
	publishedAt: RawPost['published_at'];
	updatedAt: RawPost['updated_at'];
	createdAt: RawPost['created_at'];
}

interface RawPostMedia {
	id: Generated<number>;
	post_id: number;
	media_id: number;
}

export interface PostMedia extends Omit<RawPostMedia, 'post_id' | 'media_id'> {
	postId: RawPostMedia['post_id'];
	mediaId: RawPostMedia['media_id'];
}

interface RawPostTag {
	id: Generated<number>;
	post_id: number;
	tag_id: number;
}

export interface PostTag extends Omit<RawPostTag, 'post_id' | 'tag_id'> {
	postId: RawPostTag['post_id'];
	tagId: RawPostTag['tag_id'];
}

interface RawSeries {
	id: Generated<number>;
	slug: string;
	title: string;
	media_id: number;
	is_deleted: Generated<boolean>;
	created_at: Generated<Date>;
}

export interface Series extends Omit<RawSeries, 'media_id' | 'is_deleted' | 'created_at'> {
	mediaId: RawSeries['media_id'];
	isDeleted: RawSeries['is_deleted'];
	createdAt: RawSeries['created_at'];
}

interface RawSeriesPost {
	id: Generated<number>;
	series_id: number;
	post_id: number;
}

export interface SeriesPost extends Omit<RawSeriesPost, 'series_id' | 'post_id'> {
	seriesId: RawSeriesPost['series_id'];
	postId: RawSeriesPost['post_id'];
}

interface RawSubscriber {
	id: Generated<number>;
	type: number;
	email: string;
	is_unsubscribed: Generated<boolean>;
	created_at: Generated<Date>;
}

export interface Subscriber extends Omit<RawSubscriber, 'is_unsubscribed' | 'created_at'> {
	isUnsubscribed: RawSubscriber['is_unsubscribed'];
	createdAt: RawSubscriber['created_at'];
}

interface RawTag {
	id: Generated<number>;
	slug: string;
	title: string;
	is_deleted: Generated<boolean>;
	created_at: Generated<Date>;
}

export interface Tag extends Omit<RawTag, 'is_deleted' | 'created_at'> {
	isDeleted: RawTag['is_deleted'];
	createdAt: RawTag['created_at'];
}

export default new Kysely<{
	comment: RawComment;
	media: RawMedia;
	post: RawPost;
	postMedia: RawPostMedia;
	postTag: RawPostTag;
	series: RawSeries;
	seriesPost: RawSeriesPost;
	subscriber: RawSubscriber;
	tag: RawTag;
}>({ dialect: new MysqlDialect({ pool: createPool(process['env']['DATABASE_URL']) }) });