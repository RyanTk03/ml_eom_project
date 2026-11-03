import type { Options } from "amqplib";
import { getAmqpChannel } from "./channel";

export async function declareQueue(
  name: string,
  options: Options.AssertQueue = { durable: true },
): Promise<void> {
  const channel = await getAmqpChannel();
  await channel.assertQueue(name, options);
}

export async function bindQueue(queue: string, exchange: string, routingKey: string): Promise<void> {
  const channel = await getAmqpChannel();
  await channel.bindQueue(queue, exchange, routingKey);
}
