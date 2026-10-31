import { connect } from "mongoose"
import env from "../libs/env"
import { FastifyInstance } from "fastify"

export const dbConnection = (server: FastifyInstance) => {
  const dbUrl = env.DATABASE_URL;

  connect(dbUrl)
  .then(() => { server.log.info(`Connected to ${dbUrl}`) })
  .catch((reason: unknown) => { server.log.error(reason) });
}
