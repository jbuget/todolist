import fastify, { FastifyInstance } from 'fastify';
import { listTasks } from './domain/usecases/queries/list_tasks';
import { createTask } from './domain/usecases/commands/create_task';
import { TaskRepository } from './domain/entities/TaskRepository';
import { getTaskById } from './domain/usecases/queries/get_task_by_id';
import { deleteTask } from './domain/usecases/commands/delete_task';
import { container } from './infrastructure/container';
import { closeTask } from './domain/usecases/commands/close_task';
import { reopenTask } from './domain/usecases/commands/reopen_task';

function build(): FastifyInstance {
  const logger = container.resolve('logger');
  const server = fastify({
    logger
  });

  server.get('/ping', async function () {
    return 'pong\n';
  });

  // Get all tasks
  server.get('/tasks', async function () {
    const taskRepository: TaskRepository = container.resolve('taskRepository');
    const taskList = await listTasks(taskRepository);
    return taskList.tasks;
  });

  // Crate a new task
  server.post('/tasks', async function (request) {
    const params = request.body;
    const taskRepository: TaskRepository = container.resolve('taskRepository');
    return await createTask(params, taskRepository);
  });

  // Get a task
  server.get<{
    Params: {
      id: string;
    }
  }>('/tasks/:id', async function (request, reply) {
    const taskId: number = parseInt(request.params.id);
    if (isNaN(taskId)) {
      reply.code(400).send();
    } else {
      const taskRepository: TaskRepository = container.resolve('taskRepository');
      const task = await getTaskById(taskId, taskRepository);
      if (!task) {
        reply.code(404).send();
      } else {
        return task;
      }
    }
  });

  // Update a task
  server.post('/tasks/:id', async function (request, reply) {
    reply.code(501).send();
  });

  // Close a task
  server.post<{
    Params: {
      id: string;
    }
  }>('/tasks/:id/close', async function (request, reply) {
    const taskId: number = parseInt(request.params.id);
    if (isNaN(taskId)) {
      reply.code(400).send();
    } else {
      const taskRepository: TaskRepository = container.resolve('taskRepository');
      await closeTask(taskId, taskRepository);
      reply.code(204).send();
    }
  });

  // Reopen a task
  server.post<{
    Params: {
      id: string;
    }
  }>('/tasks/:id/reopen', async function (request, reply) {
    const taskId: number = parseInt(request.params.id);
    if (isNaN(taskId)) {
      reply.code(400).send();
    } else {
      const taskRepository: TaskRepository = container.resolve('taskRepository');
      await reopenTask(taskId, taskRepository);
      reply.code(204).send();
    }
  });

  // Delete a task
  server.delete<{
    Params: {
      id: string;
    }
  }>('/tasks/:id', async function (request, reply) {
    const taskId: number = parseInt(request.params.id);
    const taskRepository: TaskRepository = container.resolve('taskRepository');
    await deleteTask(taskId, taskRepository);
    reply.code(204).send();
  });

  return server;
}

export { build };
