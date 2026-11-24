import { connect } from "mongoose"
import env from "../libs/env"
import { FastifyInstance, FastifyPluginCallback } from "fastify"

export const dbConnection: FastifyPluginCallback = async (server: FastifyInstance) => {
  try {
    const dbUrl = env.DATABASE_URL;

    await connect(dbUrl);
    server.log.info(`Connected to ${dbUrl}`);
  } catch (error) {
    server.log.error(error);
  }
}
