import fastify, { FastifyInstance } from 'fastify';
import { P } from 'pino';
import { listTasks } from '../domain/usecases/queries/list_tasks';
import { createTask } from '../domain/usecases/commands/create_task';
import { TaskRepositorySql } from './repositories/TaskRepositorySql';

function build(logger?: P.Logger): FastifyInstance {
  const server = fastify({
    logger
  });

  server.get('/ping', async () => {
    return 'pong\n';
  });

  // Get all tasks
  server.get('/tasks', async () => {
    const taskRepository = new TaskRepositorySql();
    const taskList = await listTasks(taskRepository);
    return taskList.tasks;
  });

  // Crate a new task
  server.post('/tasks', async (request) => {
    const params = request.body;
    const taskRepository = new TaskRepositorySql();
    return await createTask(params, taskRepository);
  });

  // Get a task
  server.get('/tasks/:id', async (request, reply) => {
    reply.code(501).send();
  });

  // Update a task
  server.post('/tasks/:id', async (request, reply) => {
    reply.code(501).send();
  });

  // Close a task
  server.post('/tasks/:id/close', async (request, reply) => {
    reply.code(501).send();
  });

  // Reopen a task
  server.post('/tasks/:id/reopen', async (request, reply) => {
    reply.code(501).send();
  });

  // Delete a task
  server.delete('/tasks/:id', async (request, reply) => {
    reply.code(501).send();
  });

  return server;
}

export { build };
