import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    userToken?: {
      userId: string;
      email: string;
      role: string;
    };
  }

  interface FastifyInstance {
    authenticate: (req: FastifyRequest, res: FastifyReply) => void;
  }
}
