import Module from '@library/module';
import getRootController from './getRoot.controller';
import getRobotsTxtController from './getRobotsTxt.controller';
import wellKnownModule from './.well-known/wellKnown.module';
import authModule from './auth/auth.module';

export default new Module({
	routers: [{
		method: 'GET',
		url: '',
		handler: getRootController
	}, {
		method: 'GET',
		url: 'robots.txt',
		handler: getRobotsTxtController
	}],
	modules: [authModule, wellKnownModule],
	prefix: '/'
});