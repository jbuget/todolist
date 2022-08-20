import { TaskRepository } from '../../entities/TaskRepository';
import { Status, Task } from '../../entities/Task';

async function createTask(params: any, taskRepository: TaskRepository): Promise<Task> {
  const task = new Task({
    id: undefined,
    content: params.content,
    status: Status.TO_DO
  });
  return await taskRepository.save(task);
}

export {
  createTask
};
