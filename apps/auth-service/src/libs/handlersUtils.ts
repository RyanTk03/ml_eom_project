// import { RouteHandler } from 'fastify';

import { RouteHandlerMethod } from "fastify";

export const defineHandlers = <T extends Record<string, RouteHandlerMethod>>(c: T): T => {
  return c;
};
