import { environment } from './environment';
import { build as buildApp } from './app';
import { build as buildLogger } from './logger';

const logger = buildLogger();

const server = buildApp(logger);

const port = environment.server.port;
const host = environment.server.host;

server.listen(port, host, (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
});
