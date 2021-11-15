import { TodoRepository } from '../../repositories/TodoRepository';
import { TodoList } from '../../models/TodoList';

function listTodos(todoRepository: TodoRepository): TodoList {
  return todoRepository.findAll();
}

export {
  listTodos
};
