import { build as app } from '../../src/infrastructure/app';

describe('API', () => {
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

  describe('GET /tasks', () => {
    it('should returns the list of all stored Tasks', async () => {
      // given
      const server = app();

      // when
      const response = await server.inject({ method: 'GET', url: '/tasks' });

      // then
      expect(response.statusCode).toBe(200);
      expect(response.json()).toStrictEqual([{
        content: 'Task 1 content',
        createdAt: '2021-11-09T17:08:02.865Z',
        id: 1,
        status: 'DONE',
        updatedAt: '2021-11-09T17:08:02.866Z'
      }, {
        content: 'Task 2 content',
        createdAt: '2021-11-09T17:08:02.927Z',
        id: 2,
        status: 'TO_DO',
        updatedAt: '2021-11-09T17:08:02.928Z'
      }, {
        content: 'Task 3 content',
        createdAt: '2021-11-09T17:08:02.969Z',
        id: 3,
        status: 'TO_DO',
        updatedAt: '2021-11-09T17:08:02.970Z'
      }]);
    });
  });
});
