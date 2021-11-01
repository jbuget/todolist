import { build as app } from '../src/app';

describe('app', () => {
  describe('GET /ping', () => {
    it('should return the string "pong"', async () => {
      // given
      const server = app();

      // when
      const response = await server.inject({ method: 'GET', url: '/ping' });

      // then
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('pong\n');
    });
  });
});
