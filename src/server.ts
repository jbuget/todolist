import { environment } from './environment';
import { build as buildApp } from './app';
import { build as buildLogger } from './logger';

const logger = buildLogger();

const server = buildApp(logger);

server.listen(environment.server.port, environment.server.host, (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
});
