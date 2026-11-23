import { type FastifyPluginCallback } from 'fastify';
import authHandlers from '../handlers/auth.handlers';

export const sessionRoutes: FastifyPluginCallback = (fastify) => {
  fastify.post('/login', authHandlers.login);
  fastify.get('/', authHandlers.getSession);
  fastify.post('/refresh', authHandlers.refreshSession);
  fastify.post('/logout', authHandlers.logout);
  fastify.post('/register', authHandlers.register);
};
