import { asClass, asFunction, asValue, createContainer } from 'awilix';
import { TaskRepositorySql } from './repositories/TaskRepositorySql';
import { PrismaClient } from '@prisma/client';
import { build as buildLogger } from './logger';

const container = createContainer({
  injectionMode: 'CLASSIC'
});

container.register({
  logger: asFunction(buildLogger).singleton(),
  prisma: asValue(new PrismaClient()),
  taskRepository: asClass(TaskRepositorySql)
});

export { container };
