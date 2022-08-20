import { updateTask } from '../../../../src/domain/usecases/commands/update_task';
import { Status, Task } from '../../../../src/domain/entities/Task';
import { TaskRepository } from '../../../../src/domain/entities/TaskRepository';
import { TaskList } from '../../../../src/domain/entities/TaskList';

describe('domain.usecases.commands.update_task', function () {
  it('should have a method #updateTask', async () => {
    // given
    const taskId: number = 1;
    const createdAt = new Date('2021-11-20T17:27:45.264Z');
    const stubbedSavedTask: Task = new Task({
      id: taskId,
      createdAt,
      updatedAt: createdAt,
      content: 'New content',
      status: Status.TO_DO
    });

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
    await updateTask({ id: taskId, content: 'New content' }, taskRepository);

    // then
    expect(stubbedSavedTask.content).toEqual('New content');
    expect(stubbedSavedTask.updatedAt.getTime() > createdAt.getTime()).toBe(true);
  });
});
