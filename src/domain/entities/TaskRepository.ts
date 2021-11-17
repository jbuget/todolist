import { TaskList } from './TaskList';

export interface TaskRepository {
  findAll(): Promise<TaskList>
}
