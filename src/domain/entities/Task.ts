export enum Status {
  // eslint-disable-next-line no-unused-vars
  TO_DO = 'TO_DO',
  // eslint-disable-next-line no-unused-vars
  DONE = 'DONE'
}

export class Task {
  id: number | undefined;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  status: Status;

  constructor(options: { id: number | undefined, content: string, createdAt?: Date, status?: Status, updatedAt?: Date }) {
    this.id = options.id;
    this.content = options.content;
    this.status = options.status || Status.TO_DO;
    this.createdAt = options.createdAt || new Date();
    this.updatedAt = options.updatedAt || this.createdAt;
  }

  addPersistentId(id: number) {
    if (this.id) {
      throw new Error('Entity already has an ID. Can not be modified.');
    }
    this.id = id;
  }

  updateContent(content: string) {
    this.content = content;
    this.updatedAt = new Date();
  }

  close() {
    if (this.status !== Status.DONE) {
      this.status = Status.DONE;
      this.updatedAt = new Date();
    }
  }

  reopen() {
    if (this.status !== Status.TO_DO) {
      this.status = Status.TO_DO;
      this.updatedAt = new Date();
    }
  }
}
