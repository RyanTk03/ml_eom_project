import { type FastifyPluginCallback } from 'fastify';
import { sessionRoutes } from '../routes/session';

const router: FastifyPluginCallback = (fastify) => {
  fastify.register(sessionRoutes, { prefix: '/auth' });
};

export default router;
