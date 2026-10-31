import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    userToken?: {
      uid: string;
      email: string;
    };
  }

  interface FastifyInstance {
    authenticate: (req: FastifyRequest, res: FastifyReply) => void;
  }
}
