import { CookieSerializeOptions } from "@fastify/cookie"
import env from "./env"

export const buildRefreshTokenCookieOptions = (): CookieSerializeOptions => {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/auth',
    maxAge: env.REFRESH_EXPIRES_IN,
  }
}