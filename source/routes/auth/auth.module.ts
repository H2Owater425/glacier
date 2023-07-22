import Module from '@library/module';
import postLoginController from './postLogin.controller';
import postTokenController from './postToken.controller';
import { Schema } from '@library/schema';

export default new Module({
	routers: [{
		method: 'POST',
		url: 'login',
		handler: postLoginController,
		schema: {
			body: {
				password: Schema['defaultSchema'].string().required()
			}
		}
	}, {
		method: 'POST',
		url: 'token',
		handler: postTokenController,
		schema: {
			body: {
				refreshToken: Schema['defaultSchema'].string().pattern(/^[\w-]+\.[\w-]+\.[\w-]+$/).required()
			}
		}
	}],
	prefix: 'auth'
})