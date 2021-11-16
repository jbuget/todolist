import { TaskList } from './TaskList';

export interface TaskRepository {
  findAll(): TaskList
}
