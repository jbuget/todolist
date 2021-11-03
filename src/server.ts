import { build as buildApp } from './app';
import { build as buildLogger } from './logger';

const logger = buildLogger();

const server = buildApp(logger);

const port = process.env.PORT || 3000;

server.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
