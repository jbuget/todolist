import { Status, Task } from '../../../src/domain/entities/Task';

describe('domain.models.Task', function () {
  describe('Constructor', function () {
    it('should return an instance of Task', () => {
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
      const task: Task = new Task(options);

      // then
      expect(task).toBeInstanceOf(Task);
      expect({ ...task }).toStrictEqual({
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
      const task: Task = new Task(options);

      // then
      expect(task.id).toBeNull();
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
      const task: Task = new Task(options);

      // then
      expect(task.status).toBe(Status.TO_DO);
    });

    it('should set "updatedAd" as "createdAt" by default', () => {
      const date = new Date('2021-11-15T20:16:00');
      const options = {
        id: null,
        createdAt: date,
        content: 'Dire à ma maman que je l’aime'
      };

      // when
      const task: Task = new Task(options);

      // then
      expect(task.updatedAt).toBe(date);
    });
  });
});
