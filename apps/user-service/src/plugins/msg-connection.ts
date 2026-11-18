import { FastifyInstance } from "fastify";
import { connect } from "@ml-eom/messaging";

export const msgConnection = async (server: FastifyInstance) => {
  try {
    const msgBrokerUrl = '';
    const connection = await connect(msgBrokerUrl);

    server.log.info(`Connected to messages broker at ${msgBrokerUrl}`);
  } catch (error) {
    server.log.error(error);
  }
}