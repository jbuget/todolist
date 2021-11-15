import { Status, Todo } from '../../../src/domain/models/Todo';

describe('domain.models.Todo', function () {
  describe('Constructor', function () {
    it('should return an instance of Todo', () => {
      // given
      const date = new Date('2021-11-15T20:16:00');
      const options = {
        id: 1,
        createdAt: date,
        updatedAt: date,
        content: 'Dire à ma maman que je l’aime',
        status: Status.DONE
      };

      // when
      const todo: Todo = new Todo(options);

      // then
      expect(todo).toBeInstanceOf(Todo);
      expect({ ...todo }).toStrictEqual({
        id: 1,
        createdAt: new Date('2021-11-15T20:16:00'),
        updatedAt: new Date('2021-11-15T20:16:00'),
        content: 'Dire à ma maman que je l’aime',
        status: 'DONE'
      });
    });

    it('should accept "null" ID', () => {
      // given
      const date = new Date('2021-11-15T20:16:00');
      const options = {
        id: null,
        createdAt: date,
        updatedAt: date,
        content: 'Dire à ma maman que je l’aime',
        status: Status.DONE
      };

      // when
      const todo: Todo = new Todo(options);

      // then
      expect(todo.id).toBeNull();
    });

    it('should set status "TO_DO" by default', () => {
      // given
      const date = new Date('2021-11-15T20:16:00');
      const options = {
        id: null,
        createdAt: date,
        updatedAt: date,
        content: 'Dire à ma maman que je l’aime'
      };

      // when
      const todo: Todo = new Todo(options);

      // then
      expect(todo.status).toBe(Status.TO_DO);
    });

    it('should set "updatedAd" as "createdAt" by default', () => {
      const date = new Date('2021-11-15T20:16:00');
      const options = {
        id: null,
        createdAt: date,
        content: 'Dire à ma maman que je l’aime'
      };

      // when
      const todo: Todo = new Todo(options);

      // then
      expect(todo.updatedAt).toBe(date);
    });
  });
});
