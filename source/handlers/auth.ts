import JsonWebToken from '@library/jsonWebToken';
import { DoneFuncWithErrOrRes, FastifyRequest, FastifyReply } from 'fastify';

export default function authHandler(request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes): void {
	request['isAdmin'] = false;
	
	if(typeof(request['headers']['authorization']) === 'string' && request['headers']['authorization'].startsWith('Bearer ')) {
		try {
			const jsonWebToken: JsonWebToken = new JsonWebToken(request['headers']['authorization'].slice(7), process['env']['SECRET']);

			if(jsonWebToken.isValid()) {
				request['isAdmin'] = true;
			}
		} catch {}
	}

	done();

	return;
}