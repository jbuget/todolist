import { Todo } from './Todo';

export class TodoList {
  todos: Todo[];

  constructor(todos?: Todo[]) {
    this.todos = todos || [];
  }
}
