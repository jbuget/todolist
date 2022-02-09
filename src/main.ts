import { environment } from './environment';
import { build as buildServer } from './server';
import { FastifyInstance } from 'fastify';

const server: FastifyInstance = buildServer();

server.listen(environment.server.port, environment.server.host, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
