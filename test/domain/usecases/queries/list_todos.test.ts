import { listTodos } from '../../../../src/domain/usecases/queries/list_todos';
import { Todo } from '../../../../src/domain/models/Todo';
import { TodoRepository } from '../../../../src/domain/models/TodoRepository';
import { TodoList } from '../../../../src/domain/models/TodoList';

describe('domain.usecases.queries.list_todos', function () {
  it('should have a method #listTodos', () => {
    // given
    const now = new Date('2021-11-15T20:01:45.264Z');
    const todo1: Todo = new Todo({ id: 1, createdAt: now, content: 'Todo_content_1' });
    const todo2: Todo = new Todo({ id: 2, createdAt: now, content: 'Todo_content_2' });
    const todoList: TodoList = new TodoList([todo1, todo2]);

    const todoRepository: TodoRepository = {
      findAll(): TodoList {
        return todoList;
      }
    };

    // when
    const todos: TodoList = listTodos(todoRepository);

    // then
    expect(todos).toStrictEqual(todoList);
  });
});
