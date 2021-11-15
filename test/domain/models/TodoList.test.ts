import { Todo } from '../../../src/domain/entities/Todo';
import { TodoList } from '../../../src/domain/entities/TodoList';

describe('domain.models.TodoList', function () {
  describe('Constructor', function () {
    it('should return an instance of TodoList', () => {
      // given
      const now = new Date('2021-11-15T20:01:45.264Z');
      const todo1: Todo = new Todo({ id: 1, createdAt: now, content: 'Todo_content_1' });
      const todo2: Todo = new Todo({ id: 2, createdAt: now, content: 'Todo_content_2' });

      // when
      const todoList: TodoList = new TodoList([todo1, todo2]);

      // then
      expect(todoList).toBeInstanceOf(TodoList);
      expect({ ...todoList }).toStrictEqual({
        todos: [todo1, todo2]
      });
    });

    it('should initialize a list of Todos by default', () => {
      // when
      const todoList: TodoList = new TodoList();

      // then
      expect(todoList.todos).toStrictEqual([]);
    });
  });
});
