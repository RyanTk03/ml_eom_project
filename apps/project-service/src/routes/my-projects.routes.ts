import { type FastifyPluginCallback } from 'fastify';
import myProjectHandlers from '../handlers/my-project.handlers';

export const myProjectRoutes: FastifyPluginCallback = (fastify) => {
  fastify.addHook("onRequest", fastify.authenticate);

  fastify.post('/', myProjectHandlers.createProject);
  fastify.get('/', myProjectHandlers.listProjects);
  fastify.get('/:id', myProjectHandlers.getOneOfMe);
};
