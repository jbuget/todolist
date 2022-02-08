import { TaskRepository } from '../../entities/TaskRepository';
import { Task } from '../../entities/Task';

async function getTaskById(id: number, taskRepository: TaskRepository): Promise<Task | null> {
  return await taskRepository.findById(id);
}

export {
  getTaskById
};
