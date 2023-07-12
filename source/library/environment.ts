import 'dotenv/config';
import { randomBytes } from 'crypto';
import configuration from 'configuration.json';

export const REQUIRED_ENVIRONMENT_VARIABLE_NAMES = ['DATABASE_URL', 'EMAIL_USER', 'EMAIL_PASSWORD', 'EMAIL_HOST', 'EMAIL_PORT', 'PORT', 'PBKDF2_ITERATION'] as const;

for(let i: number = 0; i < REQUIRED_ENVIRONMENT_VARIABLE_NAMES['length']; i++) {
	if(typeof(process['env'][REQUIRED_ENVIRONMENT_VARIABLE_NAMES[i]]) === 'undefined') {
		throw new Error(REQUIRED_ENVIRONMENT_VARIABLE_NAMES[i] + ' must be configured');
	}
}

process['env']['BLOG_PASSWORD'] = configuration['BLOG_PASSWORD'];

process['env']['TZ'] = 'UTC';

process['env']['PORT'] ||= '80';

process['env']['NODE_ENV'] ||= 'development';

process['env']['JSON_WEB_TOKEN_SECRET'] ||= randomBytes(64).toString('hex');