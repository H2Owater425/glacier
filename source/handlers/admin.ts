import { Forbidden } from '@library/httpError';
import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';

export default function adminHandler(request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes): void {
	if(request['isAdmin']) {
		done();
	} else {
		done(new Forbidden('Request must be admin'));
	}

	return;
}