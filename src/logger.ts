import pino, { P } from 'pino';
import { environment } from './environment';

function build(): P.Logger {
  return pino({
    enabled: environment.logger.enabled,
    level: environment.logger.level,
    transport: {
      target: 'pino-pretty'
    }
  });
}

export { build };
