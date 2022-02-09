import { listTasks } from '../../../../src/domain/usecases/queries/list_tasks';
import { Task } from '../../../../src/domain/entities/Task';
import { TaskRepository } from '../../../../src/domain/entities/TaskRepository';
import { TaskList } from '../../../../src/domain/entities/TaskList';

describe('domain.usecases.queries.list_tasks', function () {
  it('should have a method #listTasks', async () => {
    // given
    const now = new Date('2021-11-15T20:01:45.264Z');
    const task1: Task = new Task({ id: 1, createdAt: now, content: 'Task_content_1' });
    const task2: Task = new Task({ id: 2, createdAt: now, content: 'Task_content_2' });
    const taskList: TaskList = new TaskList([task1, task2]);

    const taskRepository: TaskRepository = {
      delete(/* task: Task */): Promise<void> {
        return Promise.resolve();
      },
      async findById(id: number): Promise<Task | null> {
        return null;
      },
      async save(task: Task): Promise<Task> {
        return task;
      },
      async findAll(): Promise<TaskList> {
        return taskList;
      }
    };

    // when
    const tasks: TaskList = await listTasks(taskRepository);

    // then
    expect(tasks).toStrictEqual(taskList);
  });
});
