function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function positiveInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }
  return value;
}

export const rabbitmqConfig = {
  amqpUrl: required("RABBITMQ_URL"),
  stream: {
    host: required("RABBITMQ_HOST"),
    port: positiveInt("RABBITMQ_STREAM_PORT", 5552),
    username: required("RABBITMQ_USER"),
    password: required("RABBITMQ_PASSWORD"),
    vhost: process.env.RABBITMQ_VHOST ?? "/",
  },
} as const;
