import { Unauthorized } from '@library/httpError';
import JsonWebToken from '@library/jsonWebToken';
import { getEpoch } from '@library/utility';
import { FastifyReply, FastifyRequest } from 'fastify';

export default function (request: FastifyRequest<{
	Body: {
		refreshToken: string;
	}
}>, reply: FastifyReply): void {
	if((new JsonWebToken(request['body']['refreshToken'], process['env']['BLOG_PASSWORD'])).isValid()) {
		const expireAt: number = getEpoch() + 7200/* 2 hours */;
		
		reply.send({
			accessToken: JsonWebToken.create({
				exp: expireAt
			}, process['env']['SECRET']),
			expireAt: expireAt
		});
	} else {
		reply.send(new Unauthorized('Body[\'refreshToken\'] must be valid'));
	}

	return;
}