import { getAmqpChannel } from "../../../rabbitmq/amqp/channel";
import type { Command } from "../contracts/command";

export async function publishCommand<TPayload>(
  queue: string,
  command: Command<TPayload>,
): Promise<void> {
  const channel = await getAmqpChannel();
  await channel.assertQueue(queue, { durable: true });

  const accepted = channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(command)),
    {
      persistent: true,
      contentType: "application/json",
      messageId: command.commandId,
      correlationId: command.correlationId,
      type: command.type,
    },
  );

  if (!accepted) {
    throw new Error(`RabbitMQ write buffer is full while publishing to ${queue}`);
  }
}
