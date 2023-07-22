import { Unauthorized } from '@library/httpError';
import JsonWebToken from '@library/jsonWebToken';
import { getEncryptedPassword, getEpoch } from '@library/utility';
import { FastifyReply, FastifyRequest } from 'fastify';

export default function (request: FastifyRequest<{
	Body: {
		password: string;
	};
}>, reply: FastifyReply): void {
	getEncryptedPassword(request['body']['password'], process['env']['SECRET'])
	.then(function (encryptedPassword: string): void {
		if(process['env']['BLOG_PASSWORD'] === encryptedPassword) {
			return;
		} else {
			throw new Unauthorized('Body[\'password\'] must be valid');
		}
	})
	.then(function (): void {
		const issueAt: number = getEpoch();
		const expireAt: number = issueAt + 7200/* 2 hours */;

		reply.send({
			refreshToken: JsonWebToken.create({
				iat: issueAt
			}, process['env']['BLOG_PASSWORD']),
			accessToken: JsonWebToken.create({
				exp: expireAt
			}, process['env']['SECRET']),
			expireAt: expireAt
		});

		return;
	})
	.catch(reply.send.bind(reply));
	
	return;
}