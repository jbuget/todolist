import { build as app } from '../../src/infrastructure/app';
import { getPrismaClient, resetDatabase } from '../test-helpers';
import { Status } from '../../src/domain/entities/Task';

describe('API', () => {
  const server = app(undefined);

  describe('GET /ping', () => {
    it('should return the string "pong"', async () => {
      // when
      const response = await server.inject({ method: 'GET', url: '/ping' });

      // then
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('pong\n');
    });
  });

  describe('/tasks', () => {
    beforeEach(() => {
      return resetDatabase();
    });

    describe('GET /', () => {
      it('should returns the list of all stored Tasks', async () => {
        // given
        const prisma = getPrismaClient();
        await prisma.task.createMany({
          data: [{
            id: 1,
            content: 'Task 1 content',
            status: 'DONE',
            createdAt: new Date('2021-11-09T17:08:02.865Z'),
            updatedAt: new Date('2021-11-09T17:08:02.866Z')
          }, {
            id: 2,
            content: 'Task 2 content',
            createdAt: new Date('2021-11-09T17:08:02.927Z'),
            updatedAt: new Date('2021-11-09T17:08:02.928Z')
          }, {
            id: 3,
            content: 'Task 3 content',
            createdAt: new Date('2021-11-09T17:08:02.969Z'),
            updatedAt: new Date('2021-11-09T17:08:02.970Z')
          }]
        });

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

    describe('POST /', () => {
      it('should ', async () => {
        // given
        const payload = {
          content: 'Some content'
        };

        // when
        const response = await server.inject({ method: 'POST', url: '/tasks', payload });

        // then
        expect(response.statusCode).toBe(200);
        const json = response.json();
        expect(json.id).toBeDefined();
        expect(json.content).toStrictEqual(payload.content);
        expect(json.status).toStrictEqual(Status.TO_DO);
        expect(json.createdAt).toBeDefined();
        expect(json.updatedAt).toBeDefined();
      });
    });
  });
});
