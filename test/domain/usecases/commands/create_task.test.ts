import { createTask } from '../../../../src/domain/usecases/commands/create_task';
import { Task } from '../../../../src/domain/entities/Task';
import { TaskRepository } from '../../../../src/domain/entities/TaskRepository';
import { TaskList } from '../../../../src/domain/entities/TaskList';

describe('domain.usecases.commands.create_task', function () {
  it('should have a method #createTask', async () => {
    // given
    const params: any = { content: 'Lorem ipsum' };
    const now = new Date('2021-11-15T20:01:45.264Z');
    const stubbedSavedTask: Task = new Task({ id: 1, createdAt: now, content: params.content });

    const taskRepository: TaskRepository = {
      async findAll(): Promise<TaskList> {
        return new TaskList();
      },
      async save(/* taskToSave: Task */): Promise<Task> {
        return stubbedSavedTask;
      }
    };

    // when
    const actual: Task = await createTask(params, taskRepository);

    // then
    expect(actual).toStrictEqual(stubbedSavedTask);
  });
});
