import fastify from 'fastify';
import router from './plugins/router';
import { logger } from './libs/logger';
import { envLoader } from './plugins/env-loader';
import { errorsHandler } from './plugins/errors-handler';
import { authProvider } from './plugins/auth-provider';
import { dbConnection } from './plugins/db-connection';

export const buildServer = () => {
  const server = fastify({
    logger: logger,
  });

  // Errors handler
  server.register(errorsHandler);

  // Load environment variables
  server.register(envLoader);

  // Authentication provider: fill all request with authenticated user details
  server.register(authProvider);

  // Register database connection
  server.register(dbConnection);

  // Register routes
  server.register(router, { prefix: '/api' });

  return server;
}