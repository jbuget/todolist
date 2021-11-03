import fastify, { FastifyInstance } from 'fastify';
import { P } from 'pino';

function build(logger?: P.Logger): FastifyInstance {

  const server = fastify({
    logger
  });

  server.get('/ping', async () => {
    return 'pong\n';
  });

  return server;
}

export { build };
