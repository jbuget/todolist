import { PrismaClient } from '@prisma/client';
import { TaskRepository } from '../../domain/entities/TaskRepository';
import { TaskList } from '../../domain/entities/TaskList';
import { Status, Task } from '../../domain/entities/Task';

export class TaskRepositorySql implements TaskRepository {
  async findAll(): Promise<TaskList> {
    const prisma = new PrismaClient();

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
}
