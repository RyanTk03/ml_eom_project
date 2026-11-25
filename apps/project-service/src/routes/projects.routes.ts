import { type FastifyPluginCallback } from 'fastify';
import projectHandlers from '../handlers/my-project.handlers';

export const projectRoutes: FastifyPluginCallback = (fastify) => {
  fastify.get('/', projectHandlers.listProjects);
};
