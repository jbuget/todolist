import { asClass, asValue, createContainer } from 'awilix';
import { TaskRepositorySql } from './repositories/TaskRepositorySql';
import { PrismaClient } from '@prisma/client';

const container = createContainer({
  injectionMode: 'CLASSIC'
});

container.register({
  prisma: asValue(new PrismaClient()),
  taskRepository: asClass(TaskRepositorySql)
});

export { container };
