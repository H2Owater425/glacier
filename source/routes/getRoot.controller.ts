import { FastifyReply, FastifyRequest } from 'fastify';

export default function (request: FastifyRequest, reply: FastifyReply): void {
	reply.send({
		message: 'Tip of the Glacier'
	});

	return;
}