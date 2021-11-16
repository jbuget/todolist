import { TaskRepository } from '../../entities/TaskRepository';
import { TaskList } from '../../entities/TaskList';

function listTasks(taskRepository: TaskRepository): TaskList {
  return taskRepository.findAll();
}

export {
  listTasks
};
