import { P } from 'pino';
import { build } from '../../src/infrastructure/logger';

describe('logger', () => {
  it('should be an instance of P.Logger', () => {
    // when
    const logger: P.Logger = build();

    // then
    expect(logger).toBeDefined();
  });
});
