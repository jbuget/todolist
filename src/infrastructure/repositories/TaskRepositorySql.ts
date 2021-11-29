import { PrismaClient } from '@prisma/client';
import { TaskRepository } from '../../domain/entities/TaskRepository';
import { TaskList } from '../../domain/entities/TaskList';
import { Status, Task } from '../../domain/entities/Task';

export class TaskRepositorySql implements TaskRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<TaskList> {
    const prisma = this.prisma;

    let domainTasks: Task[];
    try {
      const prismaTasks = await prisma.task.findMany();
      domainTasks = prismaTasks.map(task => new Task({
        id: task.id,
        content: task.content,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        status: task.status as Status
      }));
    } finally {
      await prisma.$disconnect();
    }
    return new TaskList(domainTasks);
  }

  async save(taskToSave: Task): Promise<Task> {
    const prisma = this.prisma;

    let domainTask: Task;
    try {
      const prismaTask = await prisma.task.create({
        data: {
          content: taskToSave.content,
          status: taskToSave.status,
          createdAt: taskToSave.createdAt,
          updatedAt: taskToSave.updatedAt
        }
      });
      domainTask = new Task({
        id: prismaTask.id,
        content: prismaTask.content,
        createdAt: prismaTask.createdAt,
        updatedAt: prismaTask.updatedAt,
        status: prismaTask.status as Status
      });
    } finally {
      await prisma.$disconnect();
    }
    return domainTask;
  }
}
