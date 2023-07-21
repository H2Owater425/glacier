import { REQUIRED_ENVIRONMENT_VARIABLE_NAMES } from '@library/environment';

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Record<typeof REQUIRED_ENVIRONMENT_VARIABLE_NAMES[number], string> {
			NODE_ENV: 'development' | 'production';
			SECRET: string;
		}
	}

	type ResolveFunction<T = void> = (value: T) => void;
	
	type RejectFunction = (error: any) => void;

	type RecursiveRecord<T extends string | number | symbol, S> = {
		[key in T]: S | RecursiveRecord<T, S>
	};
}