import { type FastifyPluginCallback } from 'fastify';
import userHandlers from '../handlers/user.handlers';

export const userRoutes: FastifyPluginCallback = (fastify) => {
  fastify.post('/', userHandlers.create);
  fastify.get('/', userHandlers.search);
  fastify.get('/:id', userHandlers.getById);
  fastify.patch('/:id', userHandlers.updateById);
};
