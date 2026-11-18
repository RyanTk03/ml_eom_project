import { FastifyInstance } from "fastify";
import { HttpException } from "../libs/httpException";

export const errorsHandler = (server: FastifyInstance) => {
  server.setErrorHandler((fastifyError, req, res) => {
    const error = HttpException.from(fastifyError);

    if (process.env.NODE_ENV === 'development') {
      req.log.error(error, 'Exception thrown');
    }

    res.send(error);
  });
};
