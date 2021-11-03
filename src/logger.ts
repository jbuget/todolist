import pino, { P } from 'pino';

function build(): P.Logger {

  return pino({
    transport: {
      target: 'pino-pretty'
    },
  });
}

export { build };
