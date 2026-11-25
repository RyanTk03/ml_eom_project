import { type FastifyRequest } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpException } from './httpException';
import env from './env';
import type { AccessTokenPayloadData } from "@ml-eom/shared-types";

const verifyAndDecodeToken = (req: FastifyRequest) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return null;
  }

  
  // decode token
  const decodedToken = jwt.verify(token, env.ACCESS_TOKEN_PUBLIC_KEY) as (JwtPayload & { data: AccessTokenPayloadData });
  if (!decodedToken.data.userId || !decodedToken.data.email) {
    return null;
  }

  return decodedToken;
};

export const authenticate = async (req: FastifyRequest) => {
  const authToken = verifyAndDecodeToken(req);
  if (authToken === null) {
    throw HttpException.UNAUTHORIZED();
  }

  req.userToken = authToken.data;
};

export const getAuthToken = (req: FastifyRequest) => {
  return req.userToken ?? verifyAndDecodeToken(req)?.data;
};
