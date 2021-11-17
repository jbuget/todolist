import { TaskList } from '../../../src/domain/entities/TaskList';
import { TaskRepositorySql } from '../../../src/infrastructure/repositories/TaskRepositorySql';
import { Status, Task } from '../../../src/domain/entities/Task';

describe('infrastructure.repositories.TaskRepositorySql', function () {
  describe('#findAll', () => {
    it('should return an instance of TaskList with tasks data', async () => {
      // given
      const taskRepository = new TaskRepositorySql();

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
});
