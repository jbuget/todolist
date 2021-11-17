import { TaskRepository } from '../../entities/TaskRepository';
import { TaskList } from '../../entities/TaskList';

async function listTasks(taskRepository: TaskRepository): Promise<TaskList> {
  return await taskRepository.findAll();
}

export {
  listTasks
};
