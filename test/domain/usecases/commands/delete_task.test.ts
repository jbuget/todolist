import { Task } from '../../../../src/domain/entities/Task';
import { TaskRepository } from '../../../../src/domain/entities/TaskRepository';
import { TaskList } from '../../../../src/domain/entities/TaskList';
import { deleteTask } from '../../../../src/domain/usecases/commands/delete_task';

describe('domain.usecases.commands.delete_task', function () {
  it('should have a method #deleteTask', async () => {
    // given
    let taskDeleted: boolean = false;

    const taskRepository: TaskRepository = {

      delete(/* task: Task */): Promise<void> {
        taskDeleted = true;
        return Promise.resolve();
      },
      async findById(id: number): Promise<Task | null> {
        if (id === 1234) {
          return new Task({ id: 1, content: 'Task to delete', createdAt: new Date() });
        }
        return null;
      },
      async findAll(): Promise<TaskList> {
        return new TaskList();
      },
      async save(taskToSave: Task): Promise<Task> {
        return taskToSave;
      }
    };

    // when
    await deleteTask(1234, taskRepository);

    // then
    expect(taskDeleted).toBeTruthy();
  });
});
