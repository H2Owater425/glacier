import 'dotenv/config';
import { randomBytes } from 'crypto';

export const REQUIRED_ENVIRONMENT_VARIABLE_NAMES = ['DATABASE_URL', 'EMAIL_USER', 'EMAIL_PASSWORD', 'EMAIL_HOST', 'EMAIL_PORT', 'PORT', 'RATE_LIMIT', 'PBKDF2_ITERATION', 'BLOG_NAME', 'BLOG_PASSWORD'] as const;

for(let i: number = 0; i < REQUIRED_ENVIRONMENT_VARIABLE_NAMES['length']; i++) {
	if(typeof(process['env'][REQUIRED_ENVIRONMENT_VARIABLE_NAMES[i]]) === 'undefined') {
		throw new Error(REQUIRED_ENVIRONMENT_VARIABLE_NAMES[i] + ' must be configured');
	}
}

process['env']['TZ'] = 'UTC';

process['env']['PORT'] ||= '80';

process['env']['NODE_ENV'] ||= 'development';

process['env']['SECRET'] ||= randomBytes(64).toString('hex');