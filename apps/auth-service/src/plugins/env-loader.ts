import { FastifyInstance } from "fastify";
import env from "../libs/env";

export const envLoader = (server: FastifyInstance) => {
  try {
    env.load(process.env);
  } catch (e) {
    server.log.error(e);
  }
};
