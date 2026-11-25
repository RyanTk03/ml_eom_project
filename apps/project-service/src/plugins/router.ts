import { type FastifyPluginCallback } from 'fastify';
import { myProjectRoutes } from '../routes/my-projects.routes';
import { projectRoutes } from '../routes/projects.routes';

const router: FastifyPluginCallback = (fastify) => {
  fastify.register(myProjectRoutes, { prefix: '/me' });
  fastify.register(projectRoutes, { prefix: '/' });
};

export default router;
