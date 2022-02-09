import { TaskRepository } from '../../entities/TaskRepository';
import { Task } from '../../entities/Task';

async function deleteTask(id: number, taskRepository: TaskRepository): Promise<void> {
  const task: Task | null = await taskRepository.findById(id);
  if (task) {
    await taskRepository.delete(task);
  }
}

export {
  deleteTask
};
