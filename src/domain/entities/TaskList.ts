import { Task } from './Task';

export class TaskList {
  tasks: Task[];

  constructor(tasks?: Task[]) {
    this.tasks = tasks || [];
  }
}
