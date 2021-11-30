import { environment } from './environment';
import { build as buildApp } from './infrastructure/app';
import { FastifyInstance } from 'fastify';

const main: FastifyInstance = buildApp();

main.listen(environment.server.port, environment.server.host, (err) => {
  if (err) {
    main.log.error(err);
    process.exit(1);
  }
});
