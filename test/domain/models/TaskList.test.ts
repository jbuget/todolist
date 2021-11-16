import { Task } from '../../../src/domain/entities/Task';
import { TaskList } from '../../../src/domain/entities/TaskList';

describe('domain.models.TaskList', function () {
  describe('Constructor', function () {
    it('should return an instance of TaskList', () => {
      // given
      const now = new Date('2021-11-15T20:01:45.264Z');
      const task1: Task = new Task({ id: 1, createdAt: now, content: 'Task_content_1' });
      const task2: Task = new Task({ id: 2, createdAt: now, content: 'Task_content_2' });

      // when
      const taskList: TaskList = new TaskList([task1, task2]);

      // then
      expect(taskList).toBeInstanceOf(TaskList);
      expect({ ...taskList }).toStrictEqual({
        tasks: [task1, task2]
      });
    });

    it('should initialize a list of Tasks by default', () => {
      // when
      const taskList: TaskList = new TaskList();

      // then
      expect(taskList.tasks).toStrictEqual([]);
    });
  });
});
