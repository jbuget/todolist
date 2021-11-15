import { TodoRepository } from '../../entities/TodoRepository';
import { TodoList } from '../../entities/TodoList';

function listTodos(todoRepository: TodoRepository): TodoList {
  return todoRepository.findAll();
}

export {
  listTodos
};
