import { TaskRepository } from '../../entities/TaskRepository';
import { Task } from '../../entities/Task';

async function reopenTask(id: number, taskRepository: TaskRepository): Promise<void> {
  const task: Task | null = await taskRepository.findById(id);
  if (task) {
    task.reopen();
    await taskRepository.save(task);
  }
}

export {
  reopenTask
};
