import type { Options } from "amqplib";
import { getAmqpChannel } from "./channel";

export async function declareExchange(
  name: string,
  type: "direct" | "topic" | "fanout" | "headers",
  options: Options.AssertExchange = { durable: true },
): Promise<void> {
  const channel = await getAmqpChannel();
  await channel.assertExchange(name, type, options);
}
