import fastify, { FastifyInstance } from 'fastify';

function build (): FastifyInstance {
  const server = fastify({
    logger: {
      prettyPrint: true
    }
  });

  server.get('/ping', async () => {
    return 'pong\n';
  });

  return server;
}

export { build };
