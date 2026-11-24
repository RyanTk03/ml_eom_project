import { type FastifyPluginCallback } from 'fastify';
import userHandlers from '../handlers/user.handlers';

export const userRoutes: FastifyPluginCallback = (fastify) => {
  fastify.post('/', userHandlers.create);
  fastify.get('/', userHandlers.search);
  fastify.get('/me', userHandlers.me);
  fastify.get('/:id', userHandlers.getById);
  fastify.put('/me', userHandlers.updateMe);
  fastify.patch('/:id', userHandlers.updateById);
};
