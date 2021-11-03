import { build as app } from './app';

const server = app();

server.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
