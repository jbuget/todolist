export enum Status {
  // eslint-disable-next-line no-unused-vars
  TO_DO = 'TO_DO',
  // eslint-disable-next-line no-unused-vars
  DONE = 'DONE'
}

export class Todo {
  id: number | null;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  status: Status;

  constructor(options : {id: number | null, content: string, createdAt: Date, status?: Status, updatedAt?: Date}) {
    this.id = options.id;
    this.createdAt = options.createdAt;
    this.updatedAt = options.updatedAt || this.createdAt;
    this.content = options.content;
    this.status = options.status || Status.TO_DO;
  }
}
