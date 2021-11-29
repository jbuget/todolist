import { createContainer, asClass } from 'awilix';
import { TaskRepositorySql } from './repositories/TaskRepositorySql';

const container = createContainer();

container.register({
  taskRepository: asClass(TaskRepositorySql)
});

export { container };
