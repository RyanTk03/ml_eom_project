import jwt, { JwtPayload } from 'jsonwebtoken';

interface AccessTokenPayloadData {
  userId: string;
}

export const encode = (data: AccessTokenPayloadData) => {
  return jwt.sign({ data }, '');
};

export const decode = (token: string): AccessTokenPayloadData => {
  const decoded = jwt.verify(token, '') as (JwtPayload & { data: AccessTokenPayloadData });

  return {
    userId: decoded.data.userId
  };
};
