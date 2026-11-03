import amqp, { type ChannelModel } from "amqplib";
import { rabbitmqConfig } from "../config";

let connectionPromise: Promise<ChannelModel> | undefined;

export async function getAmqpConnection(): Promise<ChannelModel> {
  if (!connectionPromise) {
    connectionPromise = amqp.connect(rabbitmqConfig.amqpUrl);
    connectionPromise.catch(() => { connectionPromise = undefined; });
  }
  return connectionPromise;
}

export async function closeAmqpConnection(): Promise<void> {
  if (!connectionPromise) return;
  const connection = await connectionPromise;
  connectionPromise = undefined;
  await connection.close();
}
