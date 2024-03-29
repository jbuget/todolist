import { TaskList } from '../../../src/domain/entities/TaskList';
import { TaskRepositorySql } from '../../../src/infrastructure/repositories/TaskRepositorySql';
import { Status, Task } from '../../../src/domain/entities/Task';
import { getPrismaClient, resetDatabase } from '../../test-helpers';

describe('infrastructure.repositories.TaskRepositorySql', function () {
  beforeEach(() => {
    return resetDatabase();
  });

  describe('#findAll', () => {
    it('should return an instance of TaskList with tasks data', async () => {
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

      const taskRepository = new TaskRepositorySql(prisma);

      // when
      const tasks: TaskList = await taskRepository.findAll();

      // then
      const task1 = new Task({
        id: 1,
        content: 'Task 1 content',
        createdAt: new Date('2021-11-09T17:08:02.865Z'),
        updatedAt: new Date('2021-11-09T17:08:02.866Z'),
        status: Status.DONE
      });
      const task2 = new Task({
        id: 2,
        content: 'Task 2 content',
        createdAt: new Date('2021-11-09T17:08:02.927Z'),
        updatedAt: new Date('2021-11-09T17:08:02.928Z'),
        status: Status.TO_DO
      });
      const task3 = new Task({
        id: 3,
        content: 'Task 3 content',
        createdAt: new Date('2021-11-09T17:08:02.969Z'),
        updatedAt: new Date('2021-11-09T17:08:02.970Z'),
        status: Status.TO_DO
      });

      const expectedTasks = new TaskList([task1, task2, task3]);
      expect(tasks).toStrictEqual(expectedTasks);
    });
  });

  describe('#save', () => {
    describe('[create]', function () {
      it('should insert an instance of Task into the database', async () => {
        // given
        const prisma = getPrismaClient();
        const prismaTasksBefore = await prisma.task.count();

        const taskRepository = new TaskRepositorySql(prisma);
        const taskToInsert: Task = new Task({ id: undefined, content: 'New task', createdAt: new Date(Date.now()) });

        // when
        await taskRepository.save(taskToInsert);

        // then
        const prismaTasksAfter = await prisma.task.count();
        expect(prismaTasksAfter).toBe(prismaTasksBefore + 1);
      });

      it('should return the instance of Task inserted and persisted', async () => {
        // given
        const prisma = getPrismaClient();
        const taskRepository = new TaskRepositorySql(prisma);
        const now = new Date(Date.now());
        const taskToInsert: Task = new Task({
          id: undefined,
          content: 'New task',
          status: Status.TO_DO,
          createdAt: now,
          updatedAt: now
        });

        // when
        const savedTask: Task = await taskRepository.save(taskToInsert);

        // then
        expect(savedTask).toBeInstanceOf(Task);
        expect(savedTask.id).toBeDefined();
        expect(savedTask.status).toStrictEqual(Status.TO_DO);
        expect(savedTask.createdAt).toStrictEqual(now);
        expect(savedTask.updatedAt).toStrictEqual(now);
      });
    });

    describe('[update]', function () {
      it('should persist the modified task', async () => {
        // given
        const prisma = getPrismaClient();

        const taskId = 1234;
        const creationDate = new Date('2021-11-09T17:08:02.865Z');

        await prisma.task.create({
          data: {
            id: taskId,
            content: 'Initial content',
            status: Status.TO_DO,
            createdAt: creationDate,
            updatedAt: creationDate
          }
        });

        const taskRepository = new TaskRepositorySql(prisma);
        const now = new Date(Date.now());
        // @ts-ignore
        const taskToUpdate: Task = await taskRepository.findById(taskId);
        taskToUpdate.content = 'New content';
        taskToUpdate.status = Status.DONE;
        taskToUpdate.updatedAt = now;

        // when
        const updatedTask: Task = await taskRepository.save(taskToUpdate);

        // then
        expect(updatedTask).toBeInstanceOf(Task);
        expect(updatedTask.id).toEqual(taskId);
        expect(updatedTask.status).toStrictEqual(Status.DONE);
        expect(updatedTask.createdAt).toStrictEqual(creationDate);
        expect(updatedTask.updatedAt).toStrictEqual(now);
      });
    });
  });

  describe('#delete', () => {
    it('should ', async () => {
      // given
      const prisma = getPrismaClient();
      const taskRepository = new TaskRepositorySql(prisma);
      const now = new Date(Date.now());
      const taskToInsert: Task = new Task({
        id: undefined,
        content: 'New task',
        status: Status.DONE,
        createdAt: now,
        updatedAt: now
      });
      const savedTask: Task = await taskRepository.save(taskToInsert);

      // when
      await taskRepository.delete(savedTask);

      // then
      const data = await prisma.task.findUnique({ where: { id: savedTask.id } });
      expect(data).toBeNull();
    });
  });
});
