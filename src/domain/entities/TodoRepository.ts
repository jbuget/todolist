import { TodoList } from './TodoList';

export interface TodoRepository {
  findAll(): TodoList
}
