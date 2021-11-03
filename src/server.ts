import { build as buildApp } from './app';
import { build as buildLogger } from './logger';

const logger = buildLogger();

const server = buildApp(logger);

server.listen(8080, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
