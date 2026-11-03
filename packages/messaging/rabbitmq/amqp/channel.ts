import type { Channel } from "amqplib";
import { getAmqpConnection } from "./connection";

let channelPromise: Promise<Channel> | undefined;

export async function getAmqpChannel(): Promise<Channel> {
  if (!channelPromise) {
    channelPromise = getAmqpConnection().then((connection) => connection.createChannel());
    channelPromise.catch(() => { channelPromise = undefined; });
  }
  return channelPromise;
}

export async function closeAmqpChannel(): Promise<void> {
  if (!channelPromise) return;
  const channel = await channelPromise;
  channelPromise = undefined;
  await channel.close();
}
