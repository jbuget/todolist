import { TaskRepository } from '../../entities/TaskRepository';
import { Task } from '../../entities/Task';

async function updateTask(params: any, taskRepository: TaskRepository): Promise<void> {
  const task: Task | null = await taskRepository.findById(params.id);
  if (task) {
    task.updateContent(params.content);
    await taskRepository.save(task);
  }
}

export {
  updateTask
};
