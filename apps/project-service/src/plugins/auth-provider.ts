import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { authenticate } from "../libs/authenticationUtils";

export const authProvider = fp(async(server: FastifyInstance) => {
  server.decorateRequest('userToken', undefined);
  // Decorate request with authenticated user
  server.decorate('authenticate', authenticate);
});
