import { type FastifyPluginCallback } from 'fastify';
import { userRoutes } from '../routes/user.route';

const router: FastifyPluginCallback = (fastify) => {
  fastify.register(userRoutes, { prefix: '/users' });
};

export default router;
