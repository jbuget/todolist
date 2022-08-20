import { reopenTask } from '../../../../src/domain/usecases/commands/reopen_task';
import { Status, Task } from '../../../../src/domain/entities/Task';
import { TaskRepository } from '../../../../src/domain/entities/TaskRepository';
import { TaskList } from '../../../../src/domain/entities/TaskList';

describe('domain.usecases.commands.reopen_task', function () {
  it('should have a method #reopenTask', async () => {
    // given
    const taskId: number = 1;
    const createdAt = new Date('2021-11-20T17:27:45.264Z');
    const stubbedSavedTask: Task = new Task({ id: taskId, createdAt, updatedAt: createdAt, content: 'Task content', status: Status.DONE });

    const taskRepository: TaskRepository = {
      delete(/* task: Task */): Promise<void> {
        return Promise.resolve();
      },
      async findById(id: number): Promise<Task | null> {
        return stubbedSavedTask;
      },
      async findAll(): Promise<TaskList> {
        return new TaskList();
      },
      async save(/* taskToSave: Task */): Promise<Task> {
        return stubbedSavedTask;
      }
    };

    // when
    await reopenTask(taskId, taskRepository);

    // then
    expect(stubbedSavedTask.status).toEqual(Status.TO_DO);
    expect(stubbedSavedTask.updatedAt.getTime() > createdAt.getTime()).toBe(true);
  });
});
