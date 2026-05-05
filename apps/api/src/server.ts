import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import { registerRoutes } from './routes/index.js';

const prisma = new PrismaClient();
const app = Fastify({ logger: true });
await app.register(cors, { origin: true });
app.decorate('prisma', prisma);
app.setErrorHandler((error: unknown, _req, reply) => {
  app.log.error(error);
  reply.status(500).send({ message: error instanceof Error ? error.message : 'Internal server error' });
});
registerRoutes(app);
const port = Number(process.env.API_PORT || 4000);
await app.listen({ port, host: '0.0.0.0' });
