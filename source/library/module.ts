import { FastifyBaseLogger, FastifySchema, FastifyTypeProvider, HTTPMethods, RouteHandlerMethod, RouteOptions as _RouteOptions } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { FastifyInstance } from 'fastify';
import { JSONSchema, NullSchema, ObjectSchema } from 'fluent-json-schema';
import { join } from 'path/posix';
import schemaErrorFormatHandler from 'source/handlers/schemaErrorFormat';
import { Schema } from '@library/schema';

type RecursiveRecord<T extends string | number | symbol, S> = {
	[key in T]: S | RecursiveRecord<T, S>
};

export type SchemaKey = 'body' | 'querystring' | 'params' | 'headers';

export interface RouteOptions extends Omit<_RouteOptions, 'handler' | 'schema'> {
	method: HTTPMethods;
	handler: RouteHandlerMethod<Server, IncomingMessage, ServerResponse, any, any, FastifySchema, FastifyTypeProvider, FastifyBaseLogger>;
	schema?: Partial<Pick<RecursiveRecord<string, | Partial<Record<'$isRequired', boolean>> | Omit<Record<string, JSONSchema>, '$isRequired'>>, SchemaKey>>;
	excludePreHandler?: boolean;
}

export default class Module {
	private options: {
		routers: RouteOptions[];
		prefix: string;
		modules?: Module[];
	};

	constructor(options: Module['options']) {
		if(options['prefix']['length'] === 0) {
			options['prefix'] = '/';
		}

		this['options'] = options;

		return;
	}

	public appendPrefix(prefix: string): void {
		this['options']['prefix'] = join(prefix, this['options']['prefix']);

		return;
	}

	public register(fastifyInstance: FastifyInstance): void {
		for(let i: number = 0; i < this['options']['routers']['length']; i++) {
			let _schema: Partial<Record<SchemaKey, ObjectSchema | NullSchema>> | undefined;

			if(typeof(this['options']['routers'][i]['schema']) === 'object') {
				_schema = {};

				const keys: SchemaKey[] = Object.getOwnPropertyNames(this['options']['routers'][i]['schema']) as SchemaKey[];

				for(let j: number = 0; j < keys['length']; j++) {
					_schema[keys[j]] = Schema.getObjectSchema((this.options.routers[i].schema as Required<Required<RouteOptions>['schema']>)[keys[j]]);
				}
			}

			fastifyInstance.route(Object.assign(this['options']['routers'][i], {
				url: join(fastifyInstance['prefix'], this['options']['prefix'], this['options']['routers'][i]['url']),
				schema: _schema,
				schemaErrorFormatter: schemaErrorFormatHandler
			}));
		}

		if(Array.isArray(this['options']['modules'])) {
			for(let i: number = 0; i < this['options']['modules']['length']; i++) {
				this['options']['modules'][i].appendPrefix(this['options']['prefix']);
				this['options']['modules'][i].register(fastifyInstance);
			}
		}

		return;
	}
}