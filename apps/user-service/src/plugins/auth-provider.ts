import { FastifyInstance } from "fastify";
import { authenticate } from "../libs/authenticationUtils";

export const authProvider = (server: FastifyInstance) => {
  // Decorate request with authenticated user
  server.decorate('authenticate', authenticate);
}