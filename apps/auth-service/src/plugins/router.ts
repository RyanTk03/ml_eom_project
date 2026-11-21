import { type FastifyPluginCallback } from 'fastify';
import { sessionRoutes } from '../routes/session';

const router: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.register(sessionRoutes, { prefix: '/auth' });

  done();
};

export default router;
