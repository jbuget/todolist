import { asClass, createContainer } from 'awilix';
import { TaskRepositorySql } from './repositories/TaskRepositorySql';
import { PrismaClient } from '@prisma/client';

const container = createContainer({
  injectionMode: 'CLASSIC'
});

container.register({
  prisma: asClass(PrismaClient),
  taskRepository: asClass(TaskRepositorySql)
});

export { container };
