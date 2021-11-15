import fastify, { FastifyInstance } from 'fastify';
import { P } from 'pino';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function build(logger?: P.Logger): FastifyInstance {
  const server = fastify({
    logger
  });

  server.get('/ping', async () => {
    return 'pong\n';
  });

  server.get('/todos', async () => {
    try {
      return await prisma.todo.findMany();
    } finally {
      await prisma.$disconnect();
    }
  });

  return server;
}

export { build };
