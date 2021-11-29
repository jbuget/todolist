import fastify, { FastifyInstance } from 'fastify';
import { P } from 'pino';
import { listTasks } from '../domain/usecases/queries/list_tasks';
import { createTask } from '../domain/usecases/commands/create_task';
import { TaskRepository } from '../domain/entities/TaskRepository';
import { container } from './container';

function build(logger?: P.Logger): FastifyInstance {
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
  server.get('/tasks/:id', async function (request, reply) {
    reply.code(501).send();
  });

  // Update a task
  server.post('/tasks/:id', async function (request, reply) {
    reply.code(501).send();
  });

  // Close a task
  server.post('/tasks/:id/close', async function (request, reply) {
    reply.code(501).send();
  });

  // Reopen a task
  server.post('/tasks/:id/reopen', async function (request, reply) {
    reply.code(501).send();
  });

  // Delete a task
  server.delete('/tasks/:id', async function (request, reply) {
    reply.code(501).send();
  });

  return server;
}

export { build };
