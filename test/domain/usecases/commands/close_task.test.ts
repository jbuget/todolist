import { closeTask } from '../../../../src/domain/usecases/commands/close_task';
import { Status, Task } from '../../../../src/domain/entities/Task';
import { TaskRepository } from '../../../../src/domain/entities/TaskRepository';
import { TaskList } from '../../../../src/domain/entities/TaskList';

describe('domain.usecases.commands.close_task', function () {
  it('should have a method #closeTask', async () => {
    // given
    const taskId: number = 1;
    const createdAt = new Date('2021-11-20T17:27:45.264Z');
    const stubbedSavedTask: Task = new Task({ id: taskId, createdAt, updatedAt: createdAt, content: 'Task content', status: Status.TO_DO });

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
    await closeTask(taskId, taskRepository);

    // then
    expect(stubbedSavedTask.status).toEqual(Status.DONE);
    expect(stubbedSavedTask.updatedAt.getTime() > createdAt.getTime()).toBeTruthy();
  });
});
