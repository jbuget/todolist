import { TodoList } from '../models/TodoList';

export interface TodoRepository {
  findAll(): TodoList
}
