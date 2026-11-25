import fastify from "fastify";
import cors from "@fastify/cors";
import { envLoader } from "./plugins/env-loader";
import { logger } from "./libs/logger";
import { errorsHandler } from "./plugins/errors-handler";
import { dbConnection } from "./plugins/db-connection";
import router from "./plugins/router";
import { authProvider } from "./plugins/auth-provider";

export const buildServer = () => {
    const server = fastify({
    logger: logger,
  });

  server.register(cors, {
    origin: ['http://localhost:3000', ''],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
  });

  // Errors handler
  server.register(errorsHandler);

  // Load environment variables
  server.register(envLoader);

  // Register database connection
  server.register(dbConnection);

  // Register database connection
  server.register(authProvider);

  // Register routes
  server.register(router, { prefix: '/api/projects' });

  return server;
}
