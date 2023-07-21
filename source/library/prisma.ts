import { Prisma, PrismaClient } from '@prisma/client';
import { NotFound } from './httpError';

export type BatchPayload = Prisma.BatchPayload;

export default new PrismaClient({
	log: process['env']['NODE_ENV'] === 'development' ? ['query', 'info', 'warn', 'error'] : undefined
});