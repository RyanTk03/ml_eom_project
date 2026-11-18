import { type FastifyRequest } from 'fastify';
import { HttpException } from './httpException';

const verifyAndDecodeToken = (req: FastifyRequest) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return null;
  }

  // decode token
  const decodedToken = { uid: '', email: '' };
  if (!decodedToken.uid || !decodedToken.email) {
    return null;
  }

  return decodedToken;
};

export const authenticate = (req: FastifyRequest) => {
  const authToken = verifyAndDecodeToken(req);
  if (authToken === null) {
    throw HttpException.UNAUTHORIZED();
  }

  req.userToken = authToken;
};

export const getAuthToken = (req: FastifyRequest) => {
  return req.userToken ?? verifyAndDecodeToken(req);
};
