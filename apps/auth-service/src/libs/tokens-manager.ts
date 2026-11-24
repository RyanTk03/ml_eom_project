import jwt, { JwtPayload } from 'jsonwebtoken';
import env from './env';
import { randomUUID } from 'crypto';

interface AccessTokenPayloadData {
  email: string;
  role: string;
  userId: string;
}

export const encode = (data: AccessTokenPayloadData) => {
  const jwtid = randomUUID();

  return {
    accessToken: jwt.sign({ data }, env.ACCESS_SECRET, {
      expiresIn: env.ACCESS_EXPIRES_IN,
      subject: data.email,
    }),
    refreshToken: jwt.sign({}, env.REFRESH_SECRET, {
      expiresIn: env.REFRESH_EXPIRES_IN,
      subject: data.email,
      jwtid: jwtid
    }),
    artifacts: {
      jwtid
    }
  };
};

export const decode = (token: string, type: 'refresh' | 'access') => {
  const decoded = jwt.verify(token, type === 'access' ? env.ACCESS_SECRET : env.REFRESH_SECRET) as (JwtPayload & { data: AccessTokenPayloadData });

  return decoded;
};
