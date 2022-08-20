import { TaskRepository } from '../../entities/TaskRepository';
import { Task } from '../../entities/Task';

async function closeTask(id: number, taskRepository: TaskRepository): Promise<void> {
  const task: Task | null = await taskRepository.findById(id);
  if (task) {
    task.close();
    await taskRepository.save(task);
  }
}

export {
  closeTask
};
