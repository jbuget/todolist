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

  // Get all tasks
  server.get('/tasks', async () => {
    try {
      return await prisma.task.findMany();
    } finally {
      await prisma.$disconnect();
    }
  });

  // Crate a new task
  server.post('/tasks', async (request, reply) => {
    reply.code(501).send();
  });

  // Get a task
  server.get('/tasks/:id', async (request, reply) => {
    reply.code(501).send();
  });

  // Update a task
  server.post('/tasks/:id', async (request, reply) => {
    reply.code(501).send();
  });

  // Close a task
  server.post('/tasks/:id/close', async (request, reply) => {
    reply.code(501).send();
  });

  // Reopen a task
  server.post('/tasks/:id/reopen', async (request, reply) => {
    reply.code(501).send();
  });

  // Delete a task
  server.delete('/tasks/:id', async (request, reply) => {
    reply.code(501).send();
  });

  return server;
}

export { build };
