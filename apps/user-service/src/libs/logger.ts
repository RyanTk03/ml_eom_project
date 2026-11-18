import type { FastifyLoggerOptions } from 'fastify/types/logger';

export const logger: FastifyLoggerOptions = {
  serializers: {
    req: (request) => ({
      method: request.method,
      url: request.url,
      hostname: request.hostname,
      remoteAddress: request.ip,
      remotePort: request.socket.remotePort,
    }),
    res: (reply) => ({
      statusCode: reply.statusCode,
    }),
  },
  ...(process.env.NODE_ENV === 'development'
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            destinations: [process.env.LOG_FILE ?? 'server.log', 1],
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
          level: 'trace',
        },
      }
    : {
        transport: {
          target: 'pino/file',
          options: {
            destination: 1,
          },
          level: 'info',
        },
      }),
};
