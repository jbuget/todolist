import { build as buildApp } from './app';
import { build as buildLogger } from './logger';

const logger = buildLogger();

const server = buildApp(logger);

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

server.listen(port, host, (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
});
