import { FastifyRequest, FastifyReply } from 'fastify'

export default function (request: FastifyRequest, reply: FastifyReply): void {
	reply.send('Contact: mailto:' + process['env']['EMAIL_USER'] + '\nExpires: ' + ((new Date()).getFullYear() + 1) + '-01-01T00:00:00.000Z\nPreferred-Languages: ko, en');

	return;
}